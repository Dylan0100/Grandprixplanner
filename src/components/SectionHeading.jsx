export default function SectionHeading({ num, icon, title, sub }) {
  return (
    <div className="psh">
      <span className="psh-num">{'0' + num}</span>
      <span className="psh-icon">{icon}</span>
      <div>
        <div className="psh-title">{title}</div>
        {sub && <div className="psh-sub">{sub}</div>}
      </div>
    </div>
  )
}
