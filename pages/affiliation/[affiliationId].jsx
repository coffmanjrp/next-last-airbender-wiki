import Image from 'next/image';

const Affiliations = ({ characters, affiliationId }) => {
  return (
    <div>
      <h1>Affiliation matching {affiliationId}</h1>
      <ul>
        {characters?.map((character) => {
          return (
            <li key={character._id}>
              <Image
                src={character.photoUrl}
                alt={character.name}
                width={333}
                height={250}
              />
              <h1>{character.name}</h1>
              <p>Affiliation: {character.affiliation}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const affiliationId = await params.affiliationId.replace(/\-/g, '+');
  const characters = await fetch(
    `https://last-airbender-api.herokuapp.com/api/v1/characters?affiliation=${affiliationId}`
  ).then((res) => res.json());

  return {
    props: {
      characters,
      affiliationId,
    },
  };
};

export default Affiliations;
