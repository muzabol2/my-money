import { Container } from '@mui/material';
import './Inspiration.css';

export default function Inspiration() {
   return (
      <Container>
         <div className="iframe-container">
            <iframe
               frameBorder="0"
               scrolling="no"
               marginHeight="0"
               marginWidth="0"
               width="788.54"
               height="443"
               type="text/html"
               src="https://www.youtube.com/embed/ZomwVcGt0LE?start=37"
               title="Wheres my Money"
            />
         </div>
      </Container>
   );
}
