export const CardApi = ({ name, species, image, status, type, gender }) => {

  if (status == "Alive")
    status = true

  if (status == "Dead")
    status = false

  return (
    <div style={{ backgroundColor: "grey", margin: "10px", borderRadius: "10px", padding: "10px" }}>
      <h1>{name}</h1>
      <p>Species: {species}</p>
      <p>Type: {type}</p>
      <p>Gender: {gender}</p>
      <img style={{ borderRadius: "10px", objectFit: "cover" }} src={image} alt={name} width={150} height={150} />
      <div style={{ width: "20px", height: "20px", marginTop: "10px", borderRadius: "50%", backgroundColor: status ? "green" : "red" }}></div>
    </div>
  )
}