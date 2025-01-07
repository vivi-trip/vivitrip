export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/home",
      permanent: false,
    },
  };
};

const Home = () => {
  return null;
};

export default Home;
