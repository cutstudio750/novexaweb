import { useState, useEffect, useRef } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Inter',sans-serif;background:#fafaf9;color:#1a1a18;overflow-x:hidden;line-height:1.6}
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-track{background:#fafaf9}
::-webkit-scrollbar-thumb{background:#d0d0cc;border-radius:2px}
::selection{background:#1a1a18;color:#fafaf9}

@keyframes drift{0%,100%{transform:translateY(0) translateX(0)}33%{transform:translateY(-40px) translateX(20px)}66%{transform:translateY(20px) translateX(-15px)}}
@keyframes drift2{0%,100%{transform:translateY(0) translateX(0)}33%{transform:translateY(30px) translateX(-25px)}66%{transform:translateY(-20px) translateX(20px)}}
@keyframes drift3{0%,100%{transform:translateY(0) translateX(0)}50%{transform:translateY(-35px) translateX(30px)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes lineGrow{from{width:0}to{width:100%}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes countUp{from{opacity:0}to{opacity:1}}
@keyframes slideIn{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:translateX(0)}}
@keyframes modalIn{from{opacity:0;transform:scale(0.97) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}

.fade-up{animation:fadeUp 0.7s ease forwards}
.blob1{animation:drift 18s ease-in-out infinite}
.blob2{animation:drift2 22s ease-in-out infinite}
.blob3{animation:drift3 16s ease-in-out infinite}

a{color:inherit;text-decoration:none}
button{cursor:pointer;font-family:'Inter',sans-serif}
input,textarea,select{font-family:'Inter',sans-serif;outline:none}
input:focus,textarea:focus,select:focus{border-color:#1a1a18!important}
`;

/* ── ANIMATED BG ── */
function AnimBg() {
  return (
    <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:0,overflow:'hidden'}}>
      <div className="blob1" style={{position:'absolute',top:'10%',left:'15%',width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(168,157,120,0.07),transparent 70%)'}}/>
      <div className="blob2" style={{position:'absolute',top:'50%',right:'10%',width:420,height:420,borderRadius:'50%',background:'radial-gradient(circle,rgba(120,140,168,0.06),transparent 70%)'}}/>
      <div className="blob3" style={{position:'absolute',bottom:'15%',left:'40%',width:360,height:360,borderRadius:'50%',background:'radial-gradient(circle,rgba(140,120,168,0.05),transparent 70%)'}}/>
      {/* Fine grid */}
      <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:0.25}} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1a1a18" strokeWidth="0.3"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" mask="url(#vignette)"/>
        <defs>
          <radialGradient id="vig" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="1"/>
            <stop offset="100%" stopColor="white" stopOpacity="0"/>
          </radialGradient>
          <mask id="vignette"><rect width="100%" height="100%" fill="url(#vig)"/></mask>
        </defs>
      </svg>
      {/* Dots */}
      {[...Array(12)].map((_,i)=>(
        <div key={i} style={{
          position:'absolute',
          width:3,height:3,borderRadius:'50%',
          background:'#1a1a18',opacity:0.08,
          left:`${8+i*8}%`,
          top:`${20+Math.sin(i*1.2)*30}%`,
          animation:`drift ${14+i*2}s ease-in-out ${i*0.8}s infinite`,
        }}/>
      ))}
    </div>
  );
}

/* ── NAVBAR ── */
function Navbar({onAudit}) {
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{const f=()=>setScrolled(window.scrollY>40);window.addEventListener('scroll',f);return()=>window.removeEventListener('scroll',f)},[]);
  const links=[['Services','#services'],['Méthode','#methode'],['Tarifs','#tarifs'],['FAQ','#faq']];
  return (
    <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:100,transition:'all 0.4s ease',
      background:scrolled?'rgba(250,250,249,0.88)':'transparent',
      backdropFilter:scrolled?'blur(16px)':'none',
      borderBottom:scrolled?'1px solid rgba(26,26,24,0.08)':'1px solid transparent',
    }}>
      <div style={{maxWidth:1100,margin:'0 auto',padding:'0 32px',height:64,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{width:28,height:28,background:'#1a1a18',borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span style={{color:'#fafaf9',fontSize:12,fontWeight:700}}>N</span>
          </div>
          <span style={{fontWeight:700,fontSize:15,letterSpacing:'-0.02em'}}>NOVEXA WEB</span>
        </div>
        <div style={{display:'flex',gap:32,alignItems:'center'}}>
          {links.map(([l,h])=>(
            <a key={l} href={h} style={{fontSize:14,color:'rgba(26,26,24,0.55)',fontWeight:400,transition:'color 0.2s'}}
               onMouseEnter={e=>e.target.style.color='#1a1a18'} onMouseLeave={e=>e.target.style.color='rgba(26,26,24,0.55)'}>{l}</a>
          ))}
          <button onClick={onAudit} style={{background:'#1a1a18',color:'#fafaf9',border:'none',padding:'9px 20px',borderRadius:100,fontSize:13,fontWeight:500,transition:'all 0.2s',letterSpacing:'-0.01em'}}
            onMouseEnter={e=>{e.target.style.background='#2d2d2a';e.target.style.transform='translateY(-1px)'}}
            onMouseLeave={e=>{e.target.style.background='#1a1a18';e.target.style.transform='translateY(0)'}}>
            Audit gratuit
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ── HERO ── */
function Hero({onAudit,onServices}) {
  const [tick,setTick]=useState(0);
  useEffect(()=>{const t=setInterval(()=>setTick(v=>v+1),2800);return()=>clearInterval(t)},[]);
  const words=['convertir.','vendre.','convaincre.','performer.'];
  return (
    <section style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'120px 32px 80px',position:'relative',zIndex:1,textAlign:'center'}}>
      <div style={{display:'inline-flex',alignItems:'center',gap:6,border:'1px solid rgba(26,26,24,0.12)',borderRadius:100,padding:'5px 14px 5px 6px',marginBottom:40,animation:'fadeUp 0.6s ease forwards',background:'rgba(250,250,249,0.8)',backdropFilter:'blur(8px)'}}>
        <span style={{background:'#1a1a18',color:'#fafaf9',fontSize:10,fontWeight:600,padding:'2px 8px',borderRadius:100,letterSpacing:'0.06em'}}>NOUVEAU</span>
        <span style={{fontSize:12,color:'rgba(26,26,24,0.6)'}}>Sites à partir de 400€</span>
      </div>

      <h1 style={{fontSize:'clamp(2.8rem,6.5vw,5.5rem)',fontWeight:900,lineHeight:1.04,letterSpacing:'-0.04em',maxWidth:820,marginBottom:0,animation:'fadeUp 0.7s 0.1s ease both'}}>
        Des sites web conçus<br/>pour{' '}
        <span key={tick} style={{display:'inline-block',animation:'slideIn 0.45s ease both',borderBottom:'3px solid #1a1a18',paddingBottom:2}}>
          {words[tick%words.length]}
        </span>
      </h1>

      <p style={{fontSize:'clamp(1rem,1.8vw,1.15rem)',color:'rgba(26,26,24,0.5)',maxWidth:540,margin:'32px auto 0',lineHeight:1.75,fontWeight:300,animation:'fadeUp 0.7s 0.2s ease both'}}>
        Nous combinons psychologie comportementale, design premium et performance technique pour transformer vos visiteurs en clients.
      </p>

      <div style={{display:'flex',gap:12,marginTop:44,flexWrap:'wrap',justifyContent:'center',animation:'fadeUp 0.7s 0.3s ease both'}}>
        <button onClick={onAudit} style={{background:'#1a1a18',color:'#fafaf9',border:'none',padding:'14px 32px',borderRadius:100,fontSize:15,fontWeight:500,letterSpacing:'-0.01em',transition:'all 0.2s'}}
          onMouseEnter={e=>{e.target.style.transform='translateY(-2px)';e.target.style.boxShadow='0 8px 24px rgba(26,26,24,0.2)'}}
          onMouseLeave={e=>{e.target.style.transform='none';e.target.style.boxShadow='none'}}>
          Obtenir un audit gratuit →
        </button>
        <button onClick={onServices} style={{background:'transparent',color:'#1a1a18',border:'1px solid rgba(26,26,24,0.15)',padding:'14px 32px',borderRadius:100,fontSize:15,fontWeight:400,transition:'all 0.2s'}}
          onMouseEnter={e=>e.target.style.borderColor='rgba(26,26,24,0.4)'}
          onMouseLeave={e=>e.target.style.borderColor='rgba(26,26,24,0.15)'}>
          Voir nos services
        </button>
      </div>

      <div style={{display:'flex',gap:48,marginTop:72,animation:'fadeUp 0.7s 0.4s ease both',flexWrap:'wrap',justifyContent:'center'}}>
        {[['99/100','Lighthouse'],['+ 42%','Conversion moy.'],['48h','Délai réponse'],['400€','Prix de départ']].map(([v,l])=>(
          <div key={l} style={{textAlign:'center'}}>
            <div style={{fontSize:22,fontWeight:700,letterSpacing:'-0.03em'}}>{v}</div>
            <div style={{fontSize:12,color:'rgba(26,26,24,0.4)',marginTop:2,fontWeight:400}}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{position:'absolute',bottom:40,left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:4,color:'rgba(26,26,24,0.25)',fontSize:11}}>
        <div style={{width:1,height:40,background:'linear-gradient(to bottom, rgba(26,26,24,0.25), transparent)'}}/>
        scroll
      </div>
    </section>
  );
}

/* ── MARQUEE ── */
function Marquee() {
  const items=['Sites Vitrines','Landing Pages','CRO','SEO Technique','Branding Digital','Refonte Stratégique','Performance','Psychologie UX'];
  const list=[...items,...items];
  return (
    <div style={{overflow:'hidden',borderTop:'1px solid rgba(26,26,24,0.08)',borderBottom:'1px solid rgba(26,26,24,0.08)',padding:'14px 0',position:'relative',zIndex:1,background:'rgba(250,250,249,0.6)',backdropFilter:'blur(8px)'}}>
      <div style={{display:'flex',animation:'drift2 0s linear infinite',whiteSpace:'nowrap'}}>
        <div style={{display:'flex',gap:48,animation:'none',transform:'none'}}>
          {list.map((item,i)=>(
            <span key={i} style={{fontSize:12,fontWeight:500,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(26,26,24,0.35)',flexShrink:0,display:'flex',alignItems:'center',gap:16}}>
              {item}
              {i<list.length-1&&<span style={{width:3,height:3,background:'rgba(26,26,24,0.2)',borderRadius:'50%',display:'inline-block'}}/>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── SERVICES ── */
const SERVICES_DATA = [
  {id:'vitrine',title:'Site vitrine premium',price:'à partir de 400€',desc:'Votre identité en ligne. Design soigné, responsive parfait, chargement ultra-rapide.',features:['Design sur-mesure','Mobile first','Formulaire de contact','SEO de base','Livraison en 2 semaines'],detail:"Idéal pour les TPE, artisans, professions libérales et startups qui veulent une présence professionnelle sans exploser leur budget. On conçoit un site qui vous ressemble : propre, rapide, et convaincant."},
  {id:'landing',title:'Landing page conversion',price:'à partir de 900€',desc:'Une page. Un objectif. Conçue pour convertir chaque visiteur en prospect.',features:['Structure persuasive','A/B test ready','Intégration CRM','Analytics avancé','Copywriting inclus'],detail:"Parfaite pour vos campagnes Google Ads ou Meta. Chaque section est construite selon les principes de la psychologie de conversion : hiérarchie visuelle, preuve sociale, urgence calibrée."},
  {id:'refonte',title:'Refonte stratégique',price:'à partir de 2 500€',desc:'Votre site actuel ne convertit pas. On diagnostique, on repense, on reconstruit.',features:['Audit complet','Nouvelle architecture','UX redesign','Migration propre','Formation incluse'],detail:"On commence par un audit approfondi (heatmaps, analytics, parcours utilisateur). Ensuite on reconstruit tout avec un objectif précis : que chaque visiteur aille là où vous voulez."},
  {id:'cro',title:'Optimisation CRO',price:'à partir de 800€/mois',desc:'Analyse continue. Tests. Données. Votre site s\'améliore chaque semaine.',features:['Heatmaps & recordings','A/B testing','Rapports mensuels','Recommandations','Suivi Lighthouse'],detail:"Le CRO n'est pas un projet ponctuel, c'est un processus. On installe les outils, on analyse les comportements, on formule des hypothèses et on teste. Mois après mois, votre taux de conversion progresse."},
  {id:'seo',title:'SEO technique',price:'à partir de 600€/mois',desc:'Visibilité maximale. Architecture parfaite. Core Web Vitals au top.',features:['Audit technique','Schema markup','Optimisation vitesse','Contenu optimisé','Rapports mensuels'],detail:"Notre SEO va au-delà des mots-clés. On s'assure que Google peut crawler, indexer et comprendre votre site. Core Web Vitals, structured data, netlinking — on couvre l'ensemble du spectre technique."},
  {id:'branding',title:'Branding digital',price:'à partir de 1 200€',desc:'Identité visuelle, système de design, charte graphique. Votre marque comme langage.',features:['Logo & identité','Charte graphique','Design system','Guidelines','Assets réseaux sociaux'],detail:"Une marque forte, c'est la base de tout. On conçoit une identité cohérente qui traverse tous vos points de contact : site, réseaux, docs commerciaux. Vos clients vous reconnaissent. Ils vous font confiance."},
];

/* ── SERVICE MODAL ── */
function ServiceModal({service,onClose,onContact}) {
  useEffect(()=>{
    document.body.style.overflow='hidden';
    return()=>{document.body.style.overflow=''};
  },[]);
  return (
    <div onClick={onClose} style={{position:'fixed',inset:0,zIndex:200,background:'rgba(250,250,249,0.7)',backdropFilter:'blur(8px)',display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
      <div onClick={e=>e.stopPropagation()} style={{background:'#fafaf9',border:'1px solid rgba(26,26,24,0.1)',borderRadius:20,padding:48,maxWidth:560,width:'100%',animation:'modalIn 0.3s ease',position:'relative',maxHeight:'90vh',overflowY:'auto'}}>
        <button onClick={onClose} style={{position:'absolute',top:20,right:20,background:'rgba(26,26,24,0.06)',border:'none',width:32,height:32,borderRadius:'50%',fontSize:14,color:'rgba(26,26,24,0.5)',transition:'all 0.2s'}}
          onMouseEnter={e=>e.target.style.background='rgba(26,26,24,0.12)'}
          onMouseLeave={e=>e.target.style.background='rgba(26,26,24,0.06)'}>✕</button>
        <div style={{fontSize:11,fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(26,26,24,0.35)',marginBottom:12}}>{service.price}</div>
        <h2 style={{fontSize:26,fontWeight:800,letterSpacing:'-0.03em',marginBottom:16}}>{service.title}</h2>
        <p style={{color:'rgba(26,26,24,0.6)',lineHeight:1.8,marginBottom:28,fontSize:15}}>{service.detail}</p>
        <div style={{marginBottom:32}}>
          <div style={{fontSize:11,fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(26,26,24,0.35)',marginBottom:14}}>Inclus</div>
          {service.features.map((f,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:'1px solid rgba(26,26,24,0.06)'}}>
              <span style={{width:16,height:16,borderRadius:'50%',background:'#1a1a18',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                <span style={{color:'#fafaf9',fontSize:9}}>✓</span>
              </span>
              <span style={{fontSize:14,color:'rgba(26,26,24,0.7)'}}>{f}</span>
            </div>
          ))}
        </div>
        <button onClick={()=>{onClose();onContact();}} style={{width:'100%',background:'#1a1a18',color:'#fafaf9',border:'none',padding:'14px',borderRadius:12,fontSize:15,fontWeight:500,transition:'all 0.2s'}}
          onMouseEnter={e=>e.target.style.background='#2d2d2a'}
          onMouseLeave={e=>e.target.style.background='#1a1a18'}>
          Demander un devis pour ce service →
        </button>
      </div>
    </div>
  );
}

function Services({onContact}) {
  const [active,setActive]=useState(null);
  return (
    <section id="services" style={{padding:'120px 32px',position:'relative',zIndex:1}}>
      {active&&<ServiceModal service={active} onClose={()=>setActive(null)} onContact={onContact}/>}
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <div style={{marginBottom:64}}>
          <div style={{fontSize:11,fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(26,26,24,0.35)',marginBottom:16}}>Services</div>
          <h2 style={{fontSize:'clamp(2rem,4.5vw,3.2rem)',fontWeight:900,letterSpacing:'-0.04em',lineHeight:1.05}}>
            Tout ce qu'il faut pour<br/>dominer votre marché.
          </h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}>
          {SERVICES_DATA.map(s=>(
            <div key={s.id} style={{border:'1px solid rgba(26,26,24,0.08)',borderRadius:16,padding:28,background:'rgba(255,255,255,0.5)',backdropFilter:'blur(8px)',transition:'all 0.25s',cursor:'pointer',position:'relative',overflow:'hidden'}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(26,26,24,0.2)';e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 12px 32px rgba(26,26,24,0.08)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(26,26,24,0.08)';e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none'}}
              onClick={()=>setActive(s)}>
              <div style={{fontSize:11,fontWeight:600,letterSpacing:'0.08em',color:'rgba(26,26,24,0.35)',marginBottom:12}}>{s.price}</div>
              <h3 style={{fontSize:17,fontWeight:700,letterSpacing:'-0.02em',marginBottom:10}}>{s.title}</h3>
              <p style={{fontSize:13,color:'rgba(26,26,24,0.5)',lineHeight:1.7,marginBottom:20}}>{s.desc}</p>
              <div style={{display:'flex',alignItems:'center',gap:4,fontSize:13,fontWeight:500,color:'rgba(26,26,24,0.7)'}}>
                En savoir plus <span style={{fontSize:16}}>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── METHOD ── */
function Method() {
  const steps=[
    {n:'01',t:'Analyse psychologique',d:"Audit de votre audience, étude comportementale, identification des biais à exploiter et des freins à lever."},
    {n:'02',t:'Architecture de conversion',d:"Structure de l'information, hiérarchie visuelle, parcours utilisateur — tout est conçu pour mener à l'action."},
    {n:'03',t:'Design premium',d:"Maquettes soignées, système de design cohérent, attention aux micro-détails qui font la différence."},
    {n:'04',t:'Développement haute performance',d:"Next.js, TypeScript, Core Web Vitals. Rapide sur tous les appareils, accessible, sécurisé."},
    {n:'05',t:'Optimisation continue',d:"Données, tests A/B, améliorations. Votre site devient plus performant chaque semaine."},
  ];
  return (
    <section id="methode" style={{padding:'120px 32px',position:'relative',zIndex:1}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <div style={{marginBottom:64}}>
          <div style={{fontSize:11,fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(26,26,24,0.35)',marginBottom:16}}>Notre méthode</div>
          <h2 style={{fontSize:'clamp(2rem,4.5vw,3.2rem)',fontWeight:900,letterSpacing:'-0.04em',lineHeight:1.05}}>
            Un processus pensé<br/>pour performer.
          </h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:0,borderLeft:'1px solid rgba(26,26,24,0.08)'}}>
          {steps.map((s,i)=>(
            <div key={i} style={{padding:'36px 40px',borderBottom:'1px solid rgba(26,26,24,0.08)',borderRight:'1px solid rgba(26,26,24,0.08)',transition:'background 0.2s'}}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.6)'}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              <div style={{fontSize:11,fontWeight:600,letterSpacing:'0.1em',color:'rgba(26,26,24,0.25)',marginBottom:14}}>{s.n}</div>
              <h3 style={{fontSize:17,fontWeight:700,letterSpacing:'-0.02em',marginBottom:10}}>{s.t}</h3>
              <p style={{fontSize:13,color:'rgba(26,26,24,0.5)',lineHeight:1.8}}>{s.d}</p>
            </div>
          ))}
          <div style={{padding:'36px 40px',borderBottom:'1px solid rgba(26,26,24,0.08)',borderRight:'1px solid rgba(26,26,24,0.08)',display:'flex',alignItems:'center',justifyContent:'center',background:'#1a1a18',borderRadius:0}}>
            <div style={{textAlign:'center'}}>
              <div style={{color:'rgba(255,255,255,0.4)',fontSize:12,marginBottom:8}}>Résultat moyen</div>
              <div style={{color:'#fafaf9',fontSize:36,fontWeight:900,letterSpacing:'-0.04em'}}>+42%</div>
              <div style={{color:'rgba(255,255,255,0.4)',fontSize:12,marginTop:4}}>de conversion</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── STATS ── */
function useCount(target,active){
  const [v,setV]=useState(0);
  useEffect(()=>{if(!active)return;let c=0;const step=target/60;const t=setInterval(()=>{c+=step;if(c>=target){setV(target);clearInterval(t)}else setV(Math.round(c))},20);return()=>clearInterval(t)},[target,active]);
  return v;
}
function StatBlock({prefix,value,suffix,label,active}){
  const v=useCount(value,active);
  return(
    <div style={{padding:'40px 0',borderRight:'1px solid rgba(26,26,24,0.08)',textAlign:'center'}}>
      <div style={{fontSize:'clamp(2.2rem,4vw,3rem)',fontWeight:900,letterSpacing:'-0.04em'}}>{prefix}{v}{suffix}</div>
      <div style={{fontSize:12,color:'rgba(26,26,24,0.4)',marginTop:6,fontWeight:400}}>{label}</div>
    </div>
  );
}
function Stats(){
  const [active,setActive]=useState(false);
  const ref=useRef();
  useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setActive(true)},{threshold:0.4});if(ref.current)o.observe(ref.current);return()=>o.disconnect()},[]);
  return(
    <section ref={ref} style={{position:'relative',zIndex:1,borderTop:'1px solid rgba(26,26,24,0.08)',borderBottom:'1px solid rgba(26,26,24,0.08)',background:'rgba(255,255,255,0.3)',backdropFilter:'blur(8px)'}}>
      <div style={{maxWidth:1100,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(4,1fr)',borderLeft:'1px solid rgba(26,26,24,0.08)'}}>
        <StatBlock prefix="+" value={42} suffix="%" label="Taux de conversion moyen" active={active}/>
        <StatBlock prefix="+" value={68} suffix="%" label="Temps passé sur le site" active={active}/>
        <StatBlock prefix="+" value={35} suffix="%" label="Demandes de devis" active={active}/>
        <StatBlock prefix="" value={99} suffix="/100" label="Performance Lighthouse" active={active}/>
      </div>
    </section>
  );
}

/* ── TARIFS ── */
function Pricing({onContact}) {
  const plans=[
    {id:'starter',name:'Starter',price:'400',period:'projet',tag:'',highlight:false,desc:"Pour les petites structures qui ont besoin d'une présence professionnelle, rapide et abordable.",items:['1 à 5 pages','Design sur-mesure','Responsive mobile','Formulaire contact','SEO de base','Livraison 2 semaines']},
    {id:'pro',name:'Pro',price:'1 500',period:'projet',tag:'Le plus choisi',highlight:true,desc:"Pour les entreprises qui veulent un site qui vend, pas juste un site qui existe.",items:['Jusqu\'à 12 pages','Design premium','UX optimisé conversion','Animations avancées','SEO technique complet','Analytics & Heatmaps','Livraison 4 semaines']},
    {id:'elite',name:'Élite',price:'Sur devis',period:'',tag:'',highlight:false,desc:"Projets complexes, plateformes, refontes stratégiques complètes. On fait du sur-mesure.",items:['Pages illimitées','Audit stratégique complet','Psychologie comportementale','CRO avancé','Suivi 6 mois','Accompagnement dédié']},
  ];
  return(
    <section id="tarifs" style={{padding:'120px 32px',position:'relative',zIndex:1}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <div style={{marginBottom:64}}>
          <div style={{fontSize:11,fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(26,26,24,0.35)',marginBottom:16}}>Tarifs</div>
          <h2 style={{fontSize:'clamp(2rem,4.5vw,3.2rem)',fontWeight:900,letterSpacing:'-0.04em',lineHeight:1.05}}>
            Des prix clairs,<br/>sans surprise.
          </h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20,alignItems:'start'}}>
          {plans.map(p=>(
            <div key={p.id} style={{border:p.highlight?'2px solid #1a1a18':'1px solid rgba(26,26,24,0.1)',borderRadius:20,padding:36,background:p.highlight?'#1a1a18':'rgba(255,255,255,0.5)',backdropFilter:'blur(8px)',position:'relative'}}>
              {p.tag&&<div style={{position:'absolute',top:-12,left:'50%',transform:'translateX(-50%)',background:'#1a1a18',color:'#fafaf9',fontSize:10,fontWeight:700,padding:'4px 14px',borderRadius:100,letterSpacing:'0.06em',whiteSpace:'nowrap'}}>{p.tag}</div>}
              <div style={{fontSize:12,fontWeight:600,letterSpacing:'0.06em',color:p.highlight?'rgba(255,255,255,0.4)':'rgba(26,26,24,0.35)',marginBottom:16,textTransform:'uppercase'}}>{p.name}</div>
              <div style={{marginBottom:8}}>
                <span style={{fontSize:36,fontWeight:900,letterSpacing:'-0.04em',color:p.highlight?'#fafaf9':'#1a1a18'}}>{p.price==='Sur devis'?'Sur':p.price+'€'}</span>
                {p.price==='Sur devis'&&<span style={{fontSize:22,fontWeight:900,color:p.highlight?'#fafaf9':'#1a1a18'}}> devis</span>}
                {p.period&&<span style={{fontSize:13,color:p.highlight?'rgba(255,255,255,0.4)':'rgba(26,26,24,0.4)',marginLeft:4}}>/{p.period}</span>}
              </div>
              <p style={{fontSize:13,color:p.highlight?'rgba(255,255,255,0.5)':'rgba(26,26,24,0.5)',lineHeight:1.7,marginBottom:24}}>{p.desc}</p>
              {p.items.map((item,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'7px 0',borderBottom:`1px solid ${p.highlight?'rgba(255,255,255,0.06)':'rgba(26,26,24,0.06)'}`}}>
                  <span style={{color:p.highlight?'rgba(255,255,255,0.6)':'rgba(26,26,24,0.4)',fontSize:13}}>✓</span>
                  <span style={{fontSize:13,color:p.highlight?'rgba(255,255,255,0.7)':'rgba(26,26,24,0.6)'}}>{item}</span>
                </div>
              ))}
              <button onClick={onContact} style={{width:'100%',marginTop:28,padding:'12px',borderRadius:10,fontSize:14,fontWeight:500,border:'none',background:p.highlight?'rgba(255,255,255,0.12)':'#1a1a18',color:p.highlight?'#fafaf9':'#fafaf9',transition:'all 0.2s'}}
                onMouseEnter={e=>e.target.style.opacity='0.8'}
                onMouseLeave={e=>e.target.style.opacity='1'}>
                Démarrer →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── TESTIMONIALS ── */
function Testimonials(){
  const t=[
    {name:'Marc Lefebvre',role:'CEO — TechVision',text:"Notre taux de conversion a augmenté de 47% en 3 mois. L'approche psychologique de Novexa change vraiment la donne.",initials:'ML'},
    {name:'Sophie Arnaud',role:'Fondatrice — Luminas',text:"Résultat au-delà des attentes. Notre CA digital a doublé en 4 mois. Je recommande sans hésitation.",initials:'SA'},
    {name:'Thomas Renard',role:'Dir. Marketing — Apex',text:"Leur site convertit 3× mieux qu'avant. Ce qui m'a convaincu : ils mesurent tout et optimisent en continu.",initials:'TR'},
  ];
  return(
    <section style={{padding:'120px 32px',position:'relative',zIndex:1,borderTop:'1px solid rgba(26,26,24,0.08)'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <div style={{marginBottom:64}}>
          <div style={{fontSize:11,fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(26,26,24,0.35)',marginBottom:16}}>Témoignages</div>
          <h2 style={{fontSize:'clamp(2rem,4.5vw,3.2rem)',fontWeight:900,letterSpacing:'-0.04em',lineHeight:1.05}}>Ils nous font confiance.</h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}>
          {t.map((item,i)=>(
            <div key={i} style={{border:'1px solid rgba(26,26,24,0.08)',borderRadius:16,padding:32,background:'rgba(255,255,255,0.5)',backdropFilter:'blur(8px)'}}>
              <div style={{display:'flex',gap:3,marginBottom:16}}>
                {[...Array(5)].map((_,si)=><span key={si} style={{fontSize:12,color:'#1a1a18'}}>★</span>)}
              </div>
              <p style={{fontSize:14,color:'rgba(26,26,24,0.65)',lineHeight:1.8,marginBottom:24,fontStyle:'italic'}}>"{item.text}"</p>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:36,height:36,borderRadius:'50%',background:'#1a1a18',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,color:'#fafaf9'}}>{item.initials}</div>
                <div>
                  <div style={{fontSize:13,fontWeight:600}}>{item.name}</div>
                  <div style={{fontSize:11,color:'rgba(26,26,24,0.4)'}}>{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ── */
function FAQ(){
  const [open,setOpen]=useState(null);
  const faqs=[
    {q:"Comment se passe un projet avec Novexa Web ?",a:"On démarre par un appel de 30 min pour comprendre vos objectifs. Ensuite on propose un devis détaillé, on démarre par la maquette, puis le développement, puis la livraison avec formation. Simple et transparent."},
    {q:"Le tarif à 400€ est-il vraiment complet ?",a:"Oui. 400€ c'est notre entrée de gamme : jusqu'à 5 pages, design sur-mesure, responsive, formulaire de contact et SEO de base. Pas de frais cachés. C'est un vrai site pro, pas un template modifié."},
    {q:"Combien de temps prend la création d'un site ?",a:"Starter : 2 semaines. Pro : 4 semaines. Élite : 6-10 semaines selon la complexité. On respecte les délais — c'est une priorité chez nous."},
    {q:"Est-ce que vous travaillez avec des petites entreprises ?",a:"Absolument. La majorité de nos clients sont des TPE, artisans, consultants et startups. Notre offre Starter à 400€ a été conçue spécialement pour eux."},
    {q:"Que se passe-t-il après la livraison ?",a:"On vous forme à l'outil, on reste disponibles 30 jours pour les ajustements mineurs. Si vous souhaitez un suivi long terme, nos offres CRO mensuel sont là pour ça."},
  ];
  return(
    <section id="faq" style={{padding:'120px 32px',position:'relative',zIndex:1,borderTop:'1px solid rgba(26,26,24,0.08)'}}>
      <div style={{maxWidth:720,margin:'0 auto'}}>
        <div style={{marginBottom:64}}>
          <div style={{fontSize:11,fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(26,26,24,0.35)',marginBottom:16}}>FAQ</div>
          <h2 style={{fontSize:'clamp(2rem,4.5vw,3.2rem)',fontWeight:900,letterSpacing:'-0.04em',lineHeight:1.05}}>Questions fréquentes.</h2>
        </div>
        {faqs.map((f,i)=>(
          <div key={i} onClick={()=>setOpen(open===i?null:i)} style={{borderTop:'1px solid rgba(26,26,24,0.08)',padding:'24px 0',cursor:'pointer'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:16}}>
              <span style={{fontSize:15,fontWeight:600,letterSpacing:'-0.01em'}}>{f.q}</span>
              <span style={{fontSize:20,color:'rgba(26,26,24,0.3)',transform:open===i?'rotate(45deg)':'none',transition:'transform 0.3s ease',flexShrink:0}}>+</span>
            </div>
            {open===i&&(
              <p style={{marginTop:16,fontSize:14,color:'rgba(26,26,24,0.55)',lineHeight:1.8,animation:'fadeUp 0.3s ease'}}>{f.a}</p>
            )}
          </div>
        ))}
        <div style={{borderTop:'1px solid rgba(26,26,24,0.08)'}}/>
      </div>
    </section>
  );
}

/* ── CONTACT FORM ── */
function ContactModal({onClose}){
  const [form,setForm]=useState({name:'',company:'',email:'',phone:'',budget:'',message:''});
  const [loading,setLoading]=useState(false);
  const [success,setSuccess]=useState(false);
  const [err,setErr]=useState('');
  useEffect(()=>{document.body.style.overflow='hidden';return()=>{document.body.style.overflow=''};},[]);
  const ch=e=>setForm(f=>({...f,[e.target.name]:e.target.value}));
  const inp={width:'100%',padding:'11px 14px',background:'#fafaf9',border:'1px solid rgba(26,26,24,0.12)',borderRadius:10,color:'#1a1a18',fontSize:14,transition:'border-color 0.2s'};
  const submit=async()=>{
    if(!form.name||!form.email||!form.message){setErr('Nom, email et message sont requis.');return}
    setLoading(true);setErr('');
    try{
      const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:50,messages:[{role:'user',content:`Nouvelle demande Novexa Web:\nNom: ${form.name}\nEmail: ${form.email}\nEntreprise: ${form.company}\nBudget: ${form.budget}\nMessage: ${form.message}\n\nRéponds juste "OK reçu" en 2 mots.`}]})});
      if(r.ok)setSuccess(true);else throw new Error();
    }catch{setErr('Erreur réseau. Écrivez directement à teamnovexa@gmail.com');}
    setLoading(false);
  };
  return(
    <div onClick={onClose} style={{position:'fixed',inset:0,zIndex:300,background:'rgba(250,250,249,0.8)',backdropFilter:'blur(12px)',display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
      <div onClick={e=>e.stopPropagation()} style={{background:'#fafaf9',border:'1px solid rgba(26,26,24,0.1)',borderRadius:24,padding:'48px',maxWidth:520,width:'100%',animation:'modalIn 0.3s ease',position:'relative',maxHeight:'92vh',overflowY:'auto',boxShadow:'0 32px 80px rgba(26,26,24,0.12)'}}>
        <button onClick={onClose} style={{position:'absolute',top:18,right:18,background:'rgba(26,26,24,0.06)',border:'none',width:30,height:30,borderRadius:'50%',fontSize:13,color:'rgba(26,26,24,0.5)',cursor:'pointer'}}>✕</button>
        {success?(
          <div style={{textAlign:'center',padding:'32px 0'}}>
            <div style={{fontSize:48,marginBottom:20}}>✅</div>
            <h3 style={{fontSize:22,fontWeight:800,letterSpacing:'-0.03em',marginBottom:10}}>Message reçu !</h3>
            <p style={{color:'rgba(26,26,24,0.5)',fontSize:14,lineHeight:1.8}}>On analyse votre projet et on revient vers vous sous 24h.<br/><span style={{color:'#1a1a18',fontWeight:600}}>teamnovexa@gmail.com</span></p>
            <button onClick={onClose} style={{marginTop:28,background:'#1a1a18',color:'#fafaf9',border:'none',padding:'12px 28px',borderRadius:100,fontSize:14,fontWeight:500,cursor:'pointer'}}>Fermer</button>
          </div>
        ):(
          <>
            <h3 style={{fontSize:22,fontWeight:800,letterSpacing:'-0.03em',marginBottom:6}}>Démarrons votre projet</h3>
            <p style={{color:'rgba(26,26,24,0.4)',fontSize:13,marginBottom:32}}>Réponse garantie sous 24h • Sans engagement</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}}>
              <div><label style={{fontSize:12,color:'rgba(26,26,24,0.45)',display:'block',marginBottom:6}}>Nom *</label><input style={inp} name="name" value={form.name} onChange={ch} placeholder="Jean Dupont"/></div>
              <div><label style={{fontSize:12,color:'rgba(26,26,24,0.45)',display:'block',marginBottom:6}}>Entreprise</label><input style={inp} name="company" value={form.company} onChange={ch} placeholder="Mon Entreprise"/></div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}}>
              <div><label style={{fontSize:12,color:'rgba(26,26,24,0.45)',display:'block',marginBottom:6}}>Email *</label><input style={inp} type="email" name="email" value={form.email} onChange={ch} placeholder="jean@exemple.fr"/></div>
              <div><label style={{fontSize:12,color:'rgba(26,26,24,0.45)',display:'block',marginBottom:6}}>Téléphone</label><input style={inp} name="phone" value={form.phone} onChange={ch} placeholder="+33 6 00 00 00 00"/></div>
            </div>
            <div style={{marginBottom:12}}>
              <label style={{fontSize:12,color:'rgba(26,26,24,0.45)',display:'block',marginBottom:6}}>Budget</label>
              <select style={{...inp,cursor:'pointer',appearance:'none',backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M6 8L1 3h10z' fill='%231a1a18' opacity='.4'/%3E%3C/svg%3E\")",backgroundRepeat:'no-repeat',backgroundPosition:'calc(100% - 14px) center'}} name="budget" value={form.budget} onChange={ch}>
                <option value="">Sélectionner</option>
                {['Starter (400€)','Pro (1 500€)','Élite (sur devis)','CRO mensuel','SEO mensuel'].map(b=><option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div style={{marginBottom:24}}>
              <label style={{fontSize:12,color:'rgba(26,26,24,0.45)',display:'block',marginBottom:6}}>Votre projet *</label>
              <textarea style={{...inp,minHeight:100,resize:'vertical'}} name="message" value={form.message} onChange={ch} placeholder="Décrivez votre projet, vos objectifs, vos défis actuels..."/>
            </div>
            {err&&<p style={{color:'#c0392b',fontSize:13,marginBottom:16}}>{err}</p>}
            <button onClick={submit} disabled={loading} style={{width:'100%',background:'#1a1a18',color:'#fafaf9',border:'none',padding:'14px',borderRadius:12,fontSize:15,fontWeight:500,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:10,transition:'all 0.2s'}}
              onMouseEnter={e=>e.currentTarget.style.background='#2d2d2a'}
              onMouseLeave={e=>e.currentTarget.style.background='#1a1a18'}>
              {loading?<><span style={{width:16,height:16,border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'white',borderRadius:'50%',animation:'spin 0.7s linear infinite',display:'inline-block'}}/> Envoi en cours...</>:'Envoyer ma demande →'}
            </button>
            <p style={{textAlign:'center',color:'rgba(26,26,24,0.25)',fontSize:11,marginTop:14}}>🔒 Données confidentielles. Aucun spam.</p>
          </>
        )}
      </div>
    </div>
  );
}

/* ── CTA FINAL ── */
function CTAFinal({onContact}){
  return(
    <section style={{padding:'120px 32px',position:'relative',zIndex:1,borderTop:'1px solid rgba(26,26,24,0.08)'}}>
      <div style={{maxWidth:1100,margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'center'}}>
        <div>
          <h2 style={{fontSize:'clamp(2rem,4.5vw,3.5rem)',fontWeight:900,letterSpacing:'-0.04em',lineHeight:1.05,marginBottom:24}}>
            Votre site doit faire<br/>plus que séduire.<br/><span style={{color:'rgba(26,26,24,0.3)',fontStyle:'italic',fontWeight:300}}>Il doit convaincre.</span>
          </h2>
          <p style={{color:'rgba(26,26,24,0.5)',fontSize:15,lineHeight:1.8,marginBottom:36}}>
            On ne crée pas des sites. On crée des systèmes de conversion. Audit gratuit, réponse sous 24h, sans engagement.
          </p>
          <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
            <button onClick={onContact} style={{background:'#1a1a18',color:'#fafaf9',border:'none',padding:'14px 32px',borderRadius:100,fontSize:15,fontWeight:500,transition:'all 0.2s'}}
              onMouseEnter={e=>{e.target.style.transform='translateY(-2px)';e.target.style.boxShadow='0 8px 24px rgba(26,26,24,0.2)'}}
              onMouseLeave={e=>{e.target.style.transform='none';e.target.style.boxShadow='none'}}>
              Réserver un appel stratégique →
            </button>
          </div>
        </div>
        <div style={{display:'grid',gap:12}}>
          {[['teamnovexa@gmail.com','Contact direct'],['Réponse sous 24h','Garantie'],['Sans engagement','Audit gratuit'],['À partir de 400€','Site vitrine']].map(([v,l],i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px 20px',border:'1px solid rgba(26,26,24,0.08)',borderRadius:12,background:'rgba(255,255,255,0.5)',backdropFilter:'blur(8px)'}}>
              <span style={{fontSize:14,fontWeight:600}}>{v}</span>
              <span style={{fontSize:12,color:'rgba(26,26,24,0.4)'}}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer({onContact}){
  return(
    <footer style={{borderTop:'1px solid rgba(26,26,24,0.08)',padding:'48px 32px 32px',position:'relative',zIndex:1,background:'rgba(250,250,249,0.8)',backdropFilter:'blur(8px)'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:24,marginBottom:40}}>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <div style={{width:28,height:28,background:'#1a1a18',borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center'}}>
              <span style={{color:'#fafaf9',fontSize:12,fontWeight:700}}>N</span>
            </div>
            <span style={{fontWeight:700,fontSize:15,letterSpacing:'-0.02em'}}>NOVEXA WEB</span>
          </div>
          <div style={{display:'flex',gap:32,flexWrap:'wrap'}}>
            {[['Services','#services'],['Méthode','#methode'],['Tarifs','#tarifs'],['FAQ','#faq']].map(([l,h])=>(
              <a key={l} href={h} style={{fontSize:13,color:'rgba(26,26,24,0.4)',transition:'color 0.2s'}}
                onMouseEnter={e=>e.target.style.color='#1a1a18'} onMouseLeave={e=>e.target.style.color='rgba(26,26,24,0.4)'}>{l}</a>
            ))}
          </div>
          <button onClick={onContact} style={{background:'transparent',border:'1px solid rgba(26,26,24,0.15)',color:'#1a1a18',padding:'8px 20px',borderRadius:100,fontSize:13,fontWeight:500,transition:'all 0.2s'}}
            onMouseEnter={e=>e.target.style.borderColor='rgba(26,26,24,0.4)'}
            onMouseLeave={e=>e.target.style.borderColor='rgba(26,26,24,0.15)'}>
            Démarrer un projet
          </button>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12,paddingTop:24,borderTop:'1px solid rgba(26,26,24,0.06)'}}>
          <span style={{fontSize:12,color:'rgba(26,26,24,0.25)'}}>© 2025 Novexa Web. Tous droits réservés.</span>
          <span style={{fontSize:12,color:'rgba(26,26,24,0.25)'}}>Le design attire. La psychologie convertit.</span>
          <span style={{fontSize:12,color:'rgba(26,26,24,0.25)'}}>novexaweb.com</span>
        </div>
      </div>
    </footer>
  );
}

/* ── APP ── */
export default function App(){
  const [showContact,setShowContact]=useState(false);
  const openContact=()=>setShowContact(true);
  const closeContact=()=>setShowContact(false);
  const scrollTo=id=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'});
  return(
    <>
      <style>{css}</style>
      <AnimBg/>
      {showContact&&<ContactModal onClose={closeContact}/>}
      <Navbar onAudit={openContact}/>
      <main>
        <Hero onAudit={openContact} onServices={()=>scrollTo('services')}/>
        <Marquee/>
        <Services onContact={openContact}/>
        <Stats/>
        <Method/>
        <Pricing onContact={openContact}/>
        <Testimonials/>
        <FAQ/>
        <CTAFinal onContact={openContact}/>
      </main>
      <Footer onContact={openContact}/>
    </>
  );
}
