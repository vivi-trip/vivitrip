import { ActivityFormDataType } from "@/src/types/activityFormDataType";
import clsx from "clsx";
import React from "react";
import { Control, Controller } from "react-hook-form";

interface TextAreaProps {
  control: Control<ActivityFormDataType>;
}

const ActivityTextArea = ({ control }: TextAreaProps) => {
  return (
    <div>
      <Controller
        name="description"
        control={control}
        rules={{
          required: { value: true, message: "필수 입력 값입니다." },
          pattern: {
            value: /^[\s\S]*$/,
            message: "문자열을 포함하여 작성해주세요.",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <>
            <textarea
              {...field}
              placeholder="설명"
              className={clsx(
                "font-16px-regular w-full rounded-4 border border-gray-500 py-15 pl-16",
                "min-h-346 resize-none",
              )}
            />
            {error && <div className="pl-1 text-red-500">{error?.message}</div>}
          </>
        )}
      />
    </div>
  );
};

export default ActivityTextArea;
