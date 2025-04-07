import PenIcon from "@/assets/svgs/ic_pen.svg";
import { useUploadProfileImage } from "@/src/queries/useUsers";
import useProfileImageUrlStore from "@/src/stores/useProfileImageUrlStore";
import { ProfileImageUrlResponse } from "@/src/types/users";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface Props {
  profileImageUrl?: string;
}

const ProfileUpload = ({ profileImageUrl }: Props) => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { newProfileImageUrl, setNewProfileImageUrl, clearNewProfileImageUrl } =
    useProfileImageUrlStore();

  const { mutate } = useUploadProfileImage();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    mutate(file, {
      onSuccess: (data: ProfileImageUrlResponse) => {
        setNewProfileImageUrl(data.profileImageUrl);
        queryClient.invalidateQueries({ queryKey: ["userProfile"] });

        // 파일 입력값 초기화
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      },
    });
  };

  useEffect(() => {
    return () => {
      clearNewProfileImageUrl();
    };
  }, [clearNewProfileImageUrl]);

  return (
    <div className="relative size-160 border-0 bg-transparent p-0">
      <div
        className="relative size-160 overflow-hidden rounded-full bg-gray-200"
        style={{ boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.08)" }}>
        <Image
          className="object-cover"
          src={
            newProfileImageUrl ??
            profileImageUrl ??
            "/images/Image_default_profile_image.png"
          }
          alt="프로필 사진"
          placeholder="blur"
          blurDataURL={
            newProfileImageUrl ??
            profileImageUrl ??
            "/images/Image_default_profile_image.png"
          }
          fill
          sizes="160px"
        />
      </div>
      <label htmlFor="file-input">
        <PenIcon
          width={44}
          height={44}
          className="absolute bottom-0 right-12 z-10 cursor-pointer"
          aria-label="이미지 업로드"
        />
        <input
          id="file-input"
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleImageChange}
        />
      </label>
    </div>
  );
};

export default ProfileUpload;
