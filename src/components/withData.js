const withData = (maxSpeakerToShow) => {
  return (Component) => {
    const speakers = [
      { imageSrc: "speaker-1124", name: "Douglas Crockford" },
      { imageSrc: "speaker-1530", name: "Tamara Baker" },
      { imageSrc: "speaker-10803", name: "Eugene Chuvyrov" },
    ];
    const newSpeakers = speakers.slice(0, maxSpeakerToShow);
    return () => <Component speakers={newSpeakers} />;
  };
};

export default withData;
