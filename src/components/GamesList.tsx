import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { GridList, GridTile } from 'material-ui/GridList';
import { GameInfo } from '../types';

const styles: any = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto'
  }
};

interface Props {
  gamesList: GameInfo[];
}

/**
 * TODOS:
 * 5. onClick of any of the grid tile dispatch an action which changes the currently selected game
 * and reroutes to that game's route.
 */
class GamesList extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        <RaisedButton label="Default" />
        {
          <div style={styles.root}>
            <GridList cellHeight={180} style={styles.gridList}>
              <Subheader>Card games</Subheader>
              {this.props.gamesList.map((gameInfo: GameInfo) => (
                <GridTile
                  key={gameInfo.gameSpecId}
                  title={gameInfo.gameName}
                  subtitle={''}
                  actionIcon={
                    <IconButton>
                      <StarBorder color="white" />
                    </IconButton>
                  }
                >
                  <img src={gameInfo.screenShot.downloadURL} />
                </GridTile>
              ))}
            </GridList>
          </div>
        }
      </div>
    );
  }
}

export default GamesList;
