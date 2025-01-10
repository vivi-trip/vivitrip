import PenIcon from "@/assets/svgs/ic_pen.svg";
import { useUploadProfileImage } from "@/src/hooks/useUsers";
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
  const [uploadedImage, setUploadedImage] = useState("");

  const { mutate } = useUploadProfileImage();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      mutate(file, {
        onSuccess: (data: ProfileImageUrlResponse) => {
          setUploadedImage(data.profileImageUrl);
          url(data.profileImageUrl);
          queryClient.invalidateQueries({ queryKey: ["userProfile"] });
        },
      });
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <button
      type="button"
      onClick={() => handleUploadClick()}
      className="relative size-160 cursor-pointer border-0 bg-transparent p-0">
      <div
        className="relative size-160 overflow-hidden rounded-full bg-gray-200"
        style={{ boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.08)" }}>
        {profileImageUrl || uploadedImage ? (
          <Image
            src={profileImageUrl || uploadedImage}
            fill
            alt="프로필 사진"
            placeholder="blur"
            blurDataURL={profileImageUrl || uploadedImage}
            objectFit="contain"
          />
        ) : (
          <Image
            src="/images/Image_default_profile_image.png"
            fill
            alt="프로필 사진"
            placeholder="blur"
            blurDataURL="/images/Image_default_profile_image.png"
            objectFit="contain"
          />
        )}
      </div>
      <label htmlFor="file-input">
        <PenIcon
          width={44}
          height={44}
          className="absolute bottom-0 right-12 z-10"
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
    </button>
  );
};

export default ProfileUpload;
