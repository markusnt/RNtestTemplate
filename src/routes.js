import { createAppContainer, createStackNavigator } from 'react-navigation';
// createSwitchNavigator
import Home from '~/pages/home';
import Homelg from '~/pages/homelg';
import Mesa from '~/pages/mesa';
import Grupo from '~/pages/grupos';
import SubGrupo from '~/pages/subgrupos';
import Produto from '~/pages/produtos';
import Pedido from '~/pages/pedido';

const Routes = createStackNavigator(
  {
    HomePage: Home,
    HomelgPage: Homelg,
    MesaPage: Mesa,
    GrupoPage: Grupo,
    SubGrupoPage: SubGrupo,
    ProdutoPage: Produto,
    PedidoPage: Pedido,
  },
  {
    initialRouteName: 'HomePage',
  },
);

export default createAppContainer(Routes);
