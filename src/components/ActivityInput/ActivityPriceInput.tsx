import { ActivityFormDataType } from "@/src/types/activityFormDataType";
import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";

interface PriceInputProps {
  control: Control<ActivityFormDataType>;
}

const ActivityPriceInput = ({ control }: PriceInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div>
      <Controller
        name="price"
        control={control}
        rules={{
          required: { value: true, message: "필수 입력 값입니다." },
        }}
        render={({ field, fieldState: { error } }) => (
          <div>
            <label htmlFor="price-input" className="font-24px-bold text-black">
              가격
              <input
                {...field}
                value={isFocused && field.value === 0 ? "" : field.value}
                id="price-input"
                type="number"
                inputMode="numeric"
                min="0"
                step="0.01"
                placeholder="가격"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  field.onChange(value >= 0 ? value : 0);
                }}
                className="font-16px-regular mt-16 h-56 w-full rounded-4 border border-gray-500 py-15 pl-16"
              />
              {error && (
                <div className="pl-1 text-red-500">{error?.message}</div>
              )}
            </label>
          </div>
        )}
      />
    </div>
  );
};

export default ActivityPriceInput;
