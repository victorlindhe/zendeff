import Globals from 'zendeff/config/globals.js';

/*
 *  Global styles for the whole app
 */
export default {
  primaryBackground: {
    backgroundColor: Globals.PRIMARY_COLOR
  },
  secondaryBackground: {
    backgroundColor: Globals.SECONDARY_COLOR
  },
  view: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '5%'
  },
  innerView: {
    width: '90%',
    marginTop: 10
  },
  fullWidth: {
    width: '100%'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  column: {
    flexDirection: 'column'
  },
  regularFont: {
    fontSize: 18
  },
  flexEnd: {
    alignSelf: 'flex-end',
    marginLeft: 'auto'
  }
};