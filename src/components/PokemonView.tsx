import { useState } from 'react';

import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonToolbar,
  useIonToast,
} from '@ionic/react';

import { useParams } from 'react-router';

import useFetchPokemon from '../hooks/useFetchPokemon';
import {
  diamondOutline,
  heartOutline,
  statsChartOutline,
} from 'ionicons/icons';
import './PokemonView.css';
import { Pokemon } from '../interfaces/Pokemon';

function PokemonView() {
  const obj: { name: string } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const pokemon = useFetchPokemon(obj.name, setIsLoading);
  const [presentToast] = useIonToast();
  const [toogle, setToogle] = useState(false);

  function handleClick() {
    presentToast({
      message: 'Pokemon agregado',
      duration: 3000,
      cssClass: 'custom-toast',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
        },
      ],
    });

    let list_pokemon: Pokemon[] = JSON.parse(
      localStorage.getItem('pokemon_list') || '[]'
    );

    if (list_pokemon.includes(pokemon.name)) {
      list_pokemon = list_pokemon.filter(poke =>
        poke.name !== pokemon.name ? poke.name : null
      );

      console.log(list_pokemon);

      localStorage.setItem('pokemon_list', JSON.stringify([...list_pokemon]));
    } else {
      localStorage.setItem(
        'pokemon_list',
        JSON.stringify([...list_pokemon, pokemon.name])
      );
    }

    setToogle(prev => !prev);
  }

  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              text="Pokemon"
              defaultHref="/pokemon"
            ></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {isLoading ? (
          <IonCard>
            <IonItem>
              <IonLabel>
                <h1>
                  {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)} - #
                  {pokemon.id}
                </h1>
              </IonLabel>
            </IonItem>
            <IonCardContent>
              <img
                src={pokemon.sprites.other?.home.front_default}
                alt={pokemon.name}
              />
              <IonFab vertical="top" horizontal="end" slot="fixed">
                <IonFabButton
                  onClick={handleClick}
                  color={toogle ? 'danger' : 'primary'}
                >
                  <IonIcon icon={heartOutline} />
                </IonFabButton>
              </IonFab>
              <p style={{ textAlign: 'justify' }}>
                Lorem Ipsum es simplemente el texto de relleno de las imprentas
                y archivos de texto. Lorem Ipsum ha sido el texto de relleno
                estándar de las industrias desde el año 1500, cuando un impresor
                N. del T.
              </p>
            </IonCardContent>
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
          </IonCard>
        ) : (
          <h1>Cargando...</h1>
        )}
      </IonContent>
    </IonPage>
  );
}

export default PokemonView;
