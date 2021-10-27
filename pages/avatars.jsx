const AboutPage = ({ avatars }) => {
  return (
    <div>
      <h1>Avatars</h1>
      <ul>
        {avatars?.map((avatar) => {
          return <li key={avatar._id}>{avatar.name}</li>;
        })}
      </ul>
    </div>
  );
};

export const getStaticProps = async () => {
  const avatars = await fetch(
    'https://last-airbender-api.herokuapp.com/api/v1/characters/avatar'
  ).then((res) => res.json());

  return {
    props: { avatars },
  };
};

export default AboutPage;
