import { createAppContainer, createStackNavigator } from 'react-navigation';
// createSwitchNavigator
import Main from '~/pages/Main';
import Mesa from '~/pages/Mesa';
import Produto from '~/pages/Produto';

const Routes = createStackNavigator(
  {
    MainPage: Main,
    MesaPage: Mesa,
    ProdutoPage: Produto,
  },
  {
    initialRouteName: 'MesaPage',
  },
);

export default createAppContainer(Routes);
