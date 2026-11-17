import Icone from "../../../ds/Icone.jsx";
import "./blog.css";

// Capa dos posts enquanto não há fotos, no estilo das capas do blog do mindcloud.co:
// cartão azul da Cubo com o tipo do post, a cidade em destaque, o ícone da área e a marca embaixo.

export default function CapaPost({ post, grande = false }) {
  return (
    <div className={`cp ${grande ? "cp--grande" : ""}`} aria-hidden="true">
      <div className="cp__texto">
        <small>{post.tipo}</small>
        <strong>{post.cidade ?? post.produto}</strong>
        {post.secretaria && <span>{post.secretaria}</span>}
      </div>
      <i className="cp__ico"><Icone nome={post.icone || "blog"} size={grande ? 30 : 24} /></i>
      <span className="cp__marca"><img src="/brand/cubo-logo.svg" alt="" />{post.produto}</span>
    </div>
  );
}
