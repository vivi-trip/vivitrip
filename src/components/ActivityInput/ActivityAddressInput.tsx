import { ActivityFormDataType } from "@/src/types/activityFormDataType";
import React, { useEffect, useRef } from "react";
import { Control, Controller } from "react-hook-form";

interface DaumPostcode {
  open: () => void;
  oncomplete: (data: any) => void;
}

declare global {
  interface Window {
    daum: {
      Postcode: new (options: {
        oncomplete: (data: any) => void;
      }) => DaumPostcode;
    };
  }
}

interface AddressInputProps {
  control: Control<ActivityFormDataType>;
}

const ActivityAddressInput = ({ control }: AddressInputProps) => {
  const addressInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleOpenAddressSearch = (onChange: (value: string) => void) => {
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete(data: any) {
          if (addressInputRef?.current && data.address) {
            addressInputRef.current.value = data.address;
            onChange(data.address);
          }
        },
      }).open();
    } else {
      console.error("Daum Postcode script not loaded");
    }
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
              onClick={() => handleOpenAddressSearch(field.onChange)}
              readOnly
            />
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
