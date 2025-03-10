import PenIcon from "@/assets/svgs/ic_pen.svg";
import { useUploadProfileImage } from "@/src/queries/useUsers";
import { ProfileImageUrlResponse } from "@/src/types/Users";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRef, useState } from "react";

interface Props {
  url: (url: string) => void;
  profileImageUrl?: string;
}

const ProfileUpload = ({ url, profileImageUrl }: Props) => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | undefined>(
    undefined,
  );

  const { mutate } = useUploadProfileImage();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    mutate(file, {
      onSuccess: (data: ProfileImageUrlResponse) => {
        setUploadedImage(data.profileImageUrl);
        url(data.profileImageUrl);
        queryClient.invalidateQueries({ queryKey: ["userProfile"] });

        // 파일 입력값 초기화
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      },
    });
  };

  return (
    <div className="relative size-160 border-0 bg-transparent p-0">
      <div
        className="relative size-160 overflow-hidden rounded-full bg-gray-200"
        style={{ boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.08)" }}>
        <Image
          src={
            uploadedImage ??
            profileImageUrl ??
            "/images/Image_default_profile_image.png"
          }
          fill
          alt="프로필 사진"
          placeholder="blur"
          blurDataURL={
            uploadedImage ??
            profileImageUrl ??
            "/images/Image_default_profile_image.png"
          }
          style={{ objectFit: "cover" }}
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
