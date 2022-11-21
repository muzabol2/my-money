export default function Separator({ label }) {

   return (
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 20 }} >
         <div style={{ flex: 1, height: '1px', backgroundColor: 'black' }} />
         <div>
            <p style={{ width: '70px', textAlign: 'center', color: 'black' }}>{label}</p>
         </div>
         <div style={{ flex: 1, height: '1px', backgroundColor: 'black' }} />
      </div>
   )
}
