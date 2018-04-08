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
  negativeDisabled: {
    backgroundColor: Globals.NEGATIVE_COLOR + '50'
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
  bigFont: {
    fontSize: 28
  },
  superBigFont: {
    fontSize: 38
  },
  flexStart: {
    alignSelf: 'flex-start',
    marginRight: 'auto'
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
  },
  marginTop: {
    marginTop: 20
  },
  bold: {
    fontWeight: 'bold'
  },
  positiveText: {
    color: Globals.POSITIVE_COLOR
  },
  negativeText: {
    color: Globals.NEGATIVE_COLOR
  }
};