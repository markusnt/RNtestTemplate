import { createAppContainer, createStackNavigator } from 'react-navigation';
// createSwitchNavigator
import Home from '~/pages/home';
import Produto from '~/pages/produtos';
import Pedido from '~/pages/pedido';

const Routes = createStackNavigator(
  {
    HomePage: Home,
    ProdutoPage: Produto,
    PedidoPage: Pedido,
  },
  {
    initialRouteName: 'ProdutoPage',
  },
);

export default createAppContainer(Routes);
