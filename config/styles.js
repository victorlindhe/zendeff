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
  positive: {
    backgroundColor: Globals.POSITIVE_COLOR
  },
  positiveDisabled: {
    backgroundColor: Globals.POSITIVE_COLOR + '50'
  },
  negative: {
    backgroundColor: Globals.NEGATIVE_COLOR
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
  col2: {
    width: '50%'
  },
  column: {
    flexDirection: 'column'
  },
  regularFont: {
    fontSize: 18
  },
  superBigFont: {
    fontSize: 42
  },
  flexEnd: {
    alignSelf: 'flex-end',
    marginLeft: 'auto'
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  centeredText: {
    textAlign: 'center'
  },
  width70: {
    width: '70%'
  }
};