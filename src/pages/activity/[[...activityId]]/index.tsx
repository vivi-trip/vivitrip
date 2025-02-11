import Dropdown from "@/src/components/Dropdown";
import { useRouter } from "next/router";

const ActivitiesPage = () => {
  const router = useRouter();
  const { activityId } = router.query;

  return (
    <div className="my-80 pb-300">
      <p>체험 상세 페이지 activityId: {activityId}</p>

      <div className="flex items-center justify-between">
        <div>
          <p className="font-14px-regular">문화·예술</p>
          <p className="font-32px-bold mt-10">함께 배우면 즐거운 스트릿 댄스</p>
          <div className="mt-16 flex gap-12">
            <div className="flex gap-6">
              <p>star icon</p>
              <p className="font-14px-regular">4.9 (293)</p>
            </div>
            <div className="flex gap-2">
              <p>mark icon</p>
              <p className="font-14px-regular">서울 중구 청계천로 100 10F</p>
            </div>
          </div>
        </div>
        <div>
          <Dropdown>
            <Dropdown.Trigger>...</Dropdown.Trigger>
            <Dropdown.Menu className="left-auto right-0">
              <Dropdown.Item>수정하기</Dropdown.Item>
              <Dropdown.Item>삭제하기</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {/* 타이틀 영역 */}

      <div className="mt-24 grid h-560 grid-cols-4 grid-rows-2 gap-8 overflow-hidden rounded-12">
        <div className="col-span-2 row-span-full size-full overflow-hidden">
          <div className="font-32px-bold flex size-full items-center justify-center bg-brand-200 text-brand-600">
            Image 1
          </div>
        </div>
        <div className="size-full overflow-hidden">
          <div className="font-32px-bold flex size-full items-center justify-center bg-brand-300 text-brand-600">
            Image 2
          </div>
        </div>
        <div className="size-full overflow-hidden">
          <div className="font-32px-bold flex size-full items-center justify-center bg-brand-400 text-brand-50">
            Image 3
          </div>
        </div>
        <div className="size-full overflow-hidden">
          <div className="font-32px-bold flex size-full items-center justify-center bg-brand-500 text-brand-50">
            Image 4
          </div>
        </div>
        <div className="size-full overflow-hidden">
          <div className="font-32px-bold flex size-full items-center justify-center bg-brand-600 text-brand-50">
            Image 5
          </div>
        </div>
      </div>
      {/* 체험 이미지 영역 */}

      <div className="mt-80 grid grid-cols-8 grid-rows-3 gap-40">
        <div className="col-span-5 col-start-1 border-t border-brand-300 pt-40">
          <p className="font-20px-bold">체험 설명</p>
          <p className="font-16px-regular mt-16">
            안녕하세요! 저희 스트릿 댄스 체험을 소개합니다. 저희는 신나고
            재미있는 스트릿 댄스 스타일을 가르칩니다. 크럼프는 세계적으로 인기
            있는 댄스 스타일로, 어디서든 춤출 수 있습니다. 저희 체험에서는
            새로운 스타일을 접할 수 있고, 즐거운 시간을 보낼 수 있습니다. 저희는
            초보자부터 전문가까지 어떤 수준의 춤추는 사람도 가르칠 수 있도록
            준비해놓았습니다. 저희와 함께 즐길 수 있는 시간을 기대해주세요! 각종
            음악에 적합한 스타일로, 저희는 크럼프 외에도 전통적인 스트릿 댄스
            스타일과 최신 스트릿 댄스 스타일까지 가르칠 수 있습니다. 저희
            체험에서는 전문가가 직접 강사로 참여하기 때문에, 저희가 제공하는
            코스는 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있도록
            준비해놓았습니다. 저희 체험을 참가하게 된다면, 즐거운 시간 뿐만
            아니라 새로운 스타일을 접할 수 있을 것입니다.
          </p>
        </div>
        {/* 설명 영역 */}

        <div className="col-span-5 col-start-1 border-t border-brand-300 pt-40">
          <p>카카오 지도 API</p>
        </div>
        {/* 지도 영역 */}

        <div className="col-span-5 col-start-1 border-t border-brand-300 pt-40">
          <div>
            {/* 
              to. @hayuri1990
              
              후기 컴포넌트 렌더링 위치입니다.
              해당 파일이 아닌 컴포넌트를 따로 생성해주시길 바라며,
              변수 activityId 를 prop 으로 가져가서 api 요청에 사용하시면 됩니다.

              빈 div 태그 안에 위치한 건 overflow 컨트롤을 위해서 입니다. 작업완료 후 필요에 따라 제거 가능합니다.

              from. @JuhyeokC
            */}
            <p>후기 컴포넌트</p>
          </div>
        </div>
        {/* 후기 영역 */}

        <div className="col-start-6 col-end-[-1] row-span-full">
          <div>
            {/* 
              to. @kanghyosung1
              
              예약하기 컴포넌트 렌더링 위치입니다.
              해당 파일이 아닌 컴포넌트를 따로 생성해주시길 바라며,
              변수 activityId 를 prop 으로 가져가서 api 요청에 사용하시면 됩니다.
              
              빈 div 태그 안에 위치한 건 overflow 컨트롤을 위해서 입니다. 작업완료 후 필요에 따라 제거 가능합니다.

              from. @JuhyeokC
            */}
            <p>예약하기 컴포넌트</p>
          </div>
        </div>
        {/* 예약하기 영역 */}
      </div>
      {/* 콘텐츠 영역 */}
    </div>
  );
};

export default ActivitiesPage;
