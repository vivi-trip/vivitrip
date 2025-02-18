import { ActivityFormDataType } from "@/src/types/activityFormDataType";
import React from "react";
import { Control, Controller } from "react-hook-form";

interface TitleInputProps {
  control: Control<ActivityFormDataType>;
}

const ActivityTitleInput = ({ control }: TitleInputProps) => {
  return (
    <div>
      <Controller
        name="title"
        control={control}
        defaultValue=""
        rules={{
          required: { value: true, message: "필수 입력 값입니다." },
          pattern: {
            value: /^[^\n]+$/,
            message: "문자열을 포함하여 작성해주세요.",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <>
            <input
              {...field}
              placeholder="제목"
              className="font-16px-regular h-56 w-full rounded-4 border border-gray-500 px-16 py-15"
            />
            {error && <div className="pl-1 text-red-500">{error?.message}</div>}
          </>
        )}
      />
    </div>
  );
};

export default ActivityTitleInput;
