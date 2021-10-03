import { Grid, Typography } from '@mui/material';
import { CompositionHelpTextProps } from '../../types/compositions';
import assertUnreachable from '../../helpers/contextHelper';

const CompositionHelpText = ({ compositionType }: CompositionHelpTextProps) => {
  const fullText = (
    <Typography component="span">
      <br />
      In this composition mode enter every lead seperated by &apos;.&apos;s.
      {' '}
      <br />
      Each element must start with the method abbreviation
      and finish with the call abbreviation (use p for plain leads).
      {' '}
      <br />
      For example:
      {' '}
      <b>pb6p.pb6p.pb6p.pb6p.pb6b</b>
      {' '}
      as a 3 part would be a 180 of Bob Minor.
    </Typography>
  );

  const numericalText = (
    <Typography component="span">
      <br />
      In this composition mode enter every call position
      numerically seperated by &apos;.&apos;s.
      {' '}
      <br />
      Each element may start with the call abbreviation (a bob will be assumed)
      and must end with the lead number in the course.
      {' '}
      <br />
      For example:
      {' '}
      <b>1.s5</b>
      {' '}
      as a 2 part would be a 131 of Bob Minor coming round a lead after the second part.
    </Typography>
  );

  const positionalText = (
    <Typography component="span">
      <br />
      In this composition mode enter every call position
      by notation seperated by &apos;.&apos;s.
      {' '}
      <br />
      Each element may start with a number if the call is repeated,
      it may then contain the call abbreviation (a bob will be assumed)
      and must end with the calling position.
      {' '}
      <br />
      For example:
      {' '}
      <b>2H.2W.2H.sW</b>
      {' '}
      as a 1 part would be the standard 1250 of Yorkshire Major.
    </Typography>
  );

  const coreText = (
    <Typography component="span">
      <br />
      <br />
      Repeated sections can be pre-defined for ease in all modes by a line in the form:
      {' '}
      <b>Part=...;</b>
      {' '}
      where ... is valid composition notation.
      <br />
      You may use previous definitions in future ones.
      <br />
      For example the following would be a valid (but verbose!)
      re-writing of the Yorkshire composition in Positional notation:
      <br />
      <b>part1=2H;</b>
      <br />
      <b>part2=2W;</b>
      <br />
      <b>part3=part1.sW;</b>
      <br />
      <b>part1.part2.part3</b>
      <br />
      <br />
      See the help tab for more information.
    </Typography>
  );

  const getCompositionHelperText = () => {
    switch (compositionType) {
      case 'Full':
        return fullText;
      case 'Numerical':
        return numericalText;
      case 'Positional':
        return positionalText;
      default:
        return assertUnreachable(compositionType);
    }
  };

  return (
    <Grid item xs={12}>
      {getCompositionHelperText()}
      {coreText}
    </Grid>
  );
};

export default CompositionHelpText;
