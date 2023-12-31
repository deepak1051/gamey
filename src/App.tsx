import { useState } from 'react';
import { Box, Flex, Grid, GridItem, Show } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import GameGrid from './components/GameGrid';
import GenreList from './components/GenreList';
import { Genre } from './hooks/useGenres';
import PlatformSelector from './components/PlatformSelector';
import { Plateform } from './hooks/useGames';
import SortSelector from './components/SortSelector';
import GameHeading from './components/GameHeading';

export interface GameQuery {
  genre: Genre | null;
  platform: Plateform | null;
  sortOrder: string;
  searchText: string;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
  console.log(gameQuery);
  return (
    <>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`,
        }}
        templateColumns={{
          base: '1fr',
          lg: '200px 1fr',
        }}
      >
        <GridItem area="nav">
          <Navbar
            onSearch={(searchText) =>
              setGameQuery((prev) => ({ ...prev, searchText }))
            }
          />
        </GridItem>
        <Show above="lg">
          <GridItem area="aside" paddingX={5}>
            <GenreList
              selectedGenre={gameQuery.genre}
              onSelectGenre={(genre) =>
                setGameQuery((prev) => ({ ...prev, genre }))
              }
            />
          </GridItem>
        </Show>
        <GridItem area="main">
          <Box paddingX={2}>
            <GameHeading gameQuery={gameQuery} />
            <Flex marginBottom={5}>
              <Box marginRight={5}>
                <PlatformSelector
                  onSelectPlatform={(platform) =>
                    setGameQuery((prev) => ({ ...prev, platform }))
                  }
                  selectedPlatform={gameQuery.platform}
                />
              </Box>
              <SortSelector
                onSelectSortOrder={(sortOrder) =>
                  setGameQuery((prev) => ({ ...prev, sortOrder }))
                }
                selectedOrder={gameQuery.sortOrder}
              />
            </Flex>
          </Box>
          <GameGrid gameQuery={gameQuery} />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
