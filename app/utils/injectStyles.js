
import styled from 'styled-components';

const injectStyles = style => component => styled(component)(...style);

export default injectStyles;
