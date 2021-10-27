import Image from 'next/image';

const Character = ({ character }) => {
  return (
    <div>
      <Image
        src={character.photoUrl}
        alt={character.name}
        width={333}
        height={250}
      />
      <h1>{character.name}</h1>
      <p>Affiliation: {character.affiliation}</p>
    </div>
  );
};

export const getStaticPaths = async () => {
  const characters = await fetch(
    `https://last-airbender-api.herokuapp.com/api/v1/characters?perPage=500`
  ).then((res) => res.json());

  return {
    paths: characters.map((character) => {
      const characterId = character.name.toLowerCase().replace(/ /g, '-');

      return {
        params: {
          characterId,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const results = await fetch(
    `https://last-airbender-api.herokuapp.com/api/v1/characters?name=${params.characterId.replace(
      /\-/g,
      '+'
    )}`
  ).then((res) => res.json());

  return {
    props: {
      character: results[0],
    },
  };
};

export default Character;
