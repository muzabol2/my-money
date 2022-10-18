
const openInNewTab = url => {
   window.open(url, '_blank', 'noopener,noreferrer');
};

export default function YouTubeLink() {
   openInNewTab('https://youtu.be/ZomwVcGt0LE?t=37');

   return null;
}
