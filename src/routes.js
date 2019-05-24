import { createAppContainer, createStackNavigator } from 'react-navigation';
// createSwitchNavigator
import Home from '~/pages/home';
import Produto from '~/pages/produtos';

const Routes = createStackNavigator(
  {
    HomePage: Home,
    ProdutoPage: Produto,
  },
  {
    initialRouteName: 'ProdutoPage',
  },
);

export default createAppContainer(Routes);
