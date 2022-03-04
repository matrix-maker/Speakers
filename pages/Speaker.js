import SpeakerRenderProps from "../src/components/SpeakerRenderProps";

const Speaker = () => {
  return (
    <SpeakerRenderProps>
      {({ speakers }) =>
        speakers.map((speaker) => (
          <img src={`images/${speaker.imageSrc}.jpg`} alt={speaker.name}></img>
        ))
      }
    </SpeakerRenderProps>
  );
};

export default Speaker;
