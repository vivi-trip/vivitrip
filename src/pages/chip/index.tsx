import ReservationChip from "@/src/components/ReservationChip/ReservationChip";

const Home = () => {
  return (
    <main>
      <ReservationChip
        status="pending"
        count={4}
        onclick={() => console.log("pending")}
      />
      <ReservationChip
        status="confirmed"
        count={2}
        onclick={() => console.log("confirmed")}
      />
      <ReservationChip
        status="completed"
        count={2}
        onclick={() => console.log("completed")}
      />
      <ReservationChip
        status="canceled"
        count={1}
        onclick={() => console.log("canceled")}
      />
      <ReservationChip
        status="declined"
        count={0}
        onclick={() => console.log("declined")}
      />
    </main>
  );
};

export default Home;
