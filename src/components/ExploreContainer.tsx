import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonFooter,
  IonIcon,
  IonRow,
  IonTitle,
} from '@ionic/react';
import {
  diamondOutline,
  heartOutline,
  statsChartOutline,
} from 'ionicons/icons';
import useFetchPokemons from '../hooks/useFetchPokemons';
import { Pokemon } from '../interfaces/Pokemon';
import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  const arrPokemons = useFetchPokemons();
  return (
    <div>
      {arrPokemons?.length > 0 ? (
        arrPokemons?.map((pokemon: Pokemon) => (
          // <IonRouterLink href={`/pokemon/${pokemon.name}`} key={pokemon.id}>
          <>
            <IonCard
              key={pokemon.id}
              routerLink={`/pokemons/Index/${pokemon.name}`}
              className="card"
            >
              <IonCardHeader className="pokeTitle">
                <IonTitle>
                  {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
                </IonTitle>
              </IonCardHeader>
              <IonCardContent>
                <img
                  src={pokemon?.sprites?.other?.home.front_default}
                  alt={pokemon.name}
                  className="imgPokeCard"
                />
                <p className="text">
                  Lorem Ipsum es simplemente el texto de relleno de las
                  imprentas y archivos de texto. Lorem Ipsum ha sido el texto de
                  relleno estándar de las industrias desde el año 1500, cuando
                  un impresor N. del T. <span className="info">Ver mas...</span>{' '}
                </p>
              </IonCardContent>

              <IonFooter>
                <IonRow className="card_footer">
                  <IonCol>
                    <IonIcon icon={heartOutline} size="large" />
                    <p>HP: {pokemon.stats[0].base_stat}</p>
                  </IonCol>
                  <IonCol>
                    <IonIcon icon={statsChartOutline} size="large" />
                    <p>Attack: {pokemon.stats[1].base_stat}</p>
                  </IonCol>
                  <IonCol>
                    <IonIcon icon={diamondOutline} size="large" />
                    <p>Defense: {pokemon.stats[2].base_stat}</p>
                  </IonCol>
                </IonRow>
              </IonFooter>
            </IonCard>
          </>
          // </IonRouterLink>
        ))
      ) : (
        <h1>Cargando...</h1>
      )}
    </div>
  );
};

export default ExploreContainer;
