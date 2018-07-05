import { Connection } from '../bigchaindb-driver';
import APPCONFIG from '../../constants/config';

const BigchaindbConnection = new Connection(APPCONFIG.apiURL, {
  app_id: process.env.REACT_APP_BIGCHAINDB_APP_ID,
  app_key: process.env.REACT_APP_BIGCHAINDB_APP_KEY,
});

export default BigchaindbConnection;