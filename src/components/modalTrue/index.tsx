
type ModalProps =  {
	title: string;
	content: string;
	href: string
}

export default function ModalTrue({title,content,href}: ModalProps){
	return (
<div className="card">
  <h5 className="card-header">Mensagem</h5>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{content}</p>
    <a href={href} className="btn btn-primary" data-mdb-ripple-init>Continuar</a>
  </div>
</div>
		);
}