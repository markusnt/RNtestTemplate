import { createAppContainer, createStackNavigator } from 'react-navigation';
// createSwitchNavigator
import Main from '~/pages/Main';
import Produto from '~/pages/Produto';

const Routes = createStackNavigator(
  {
    MainPage: Main,
    ProdutoPage: Produto,
  },
  {
    initialRouteName: 'ProdutoPage',
  },
);

export default createAppContainer(Routes);
