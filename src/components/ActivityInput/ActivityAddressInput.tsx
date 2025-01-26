import { ActivityFormDataType } from "@/src/types/activityFormDataType";
import React, { useRef, useState } from "react";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import { Control, Controller } from "react-hook-form";

interface AddressInputProps {
  control: Control<ActivityFormDataType>;
}

const ActivityAddressInput = ({ control }: AddressInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const addressInputRef = useRef<HTMLInputElement | null>(null);

  const handleComplete = (data: Address, onChange: (value: string) => void) => {
    if (addressInputRef?.current) {
      addressInputRef.current.value = data.address;
      onChange(data.address);
    }
    setIsOpen(false);
  };
  return (
    <div className="flex flex-col gap-6">
      <Controller
        name="address"
        control={control}
        rules={{
          required: { value: true, message: "주소를 입력해주세요." },
        }}
        render={({ field, fieldState: { error } }) => (
          <label htmlFor="address-input" className="font-24px-bold text-black">
            주소
            <input
              {...field}
              ref={(e) => {
                addressInputRef.current = e;
                field.ref(e);
              }}
              className="font-16px-regular mt-16 h-56 w-full rounded-4 border border-gray-500 py-15 pl-16"
              type="text"
              id="address-input"
              placeholder="주소를 입력해주세요."
              onClick={() => setIsOpen(true)}
              readOnly
            />
            {isOpen && (
              <div className="relative mt-2">
                <DaumPostcodeEmbed
                  onComplete={(data) => handleComplete(data, field.onChange)}
                  style={{ height: 300 }}
                />
              </div>
            )}
            {error && (
              <div className="mt-2 pl-1 text-red-500">{error.message}</div>
            )}
          </label>
        )}
      />
    </div>
  );
};

export default ActivityAddressInput;
