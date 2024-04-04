/* eslint-disable react/prop-types */
export const Card = ({ name, desc, value, image, status }) => {
  return (
    <div style={{ backgroundColor: "grey", margin: "10px", borderRadius: "10px", padding: "10px" }}>
      <h1>{name}</h1>
      <h2>{desc}</h2>
      <p>{value}</p>
      <img style={{ borderRadius: "10px", objectFit: "cover" }} src={image} alt={name} width={150} height={150} />
      <div style={{ width: "20px", height: "20px", marginTop: "10px", borderRadius: "50%", backgroundColor: status ? "green" : "red" }}></div>
    </div>
  )
}