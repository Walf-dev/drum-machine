class DrumKeys extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keysAspect: inactive };

    this.playNote = this.playNote.bind(this);
    this.handleKeyBoardPress = this.handleKeyBoardPress.bind(this);
    this.activateKey = this.activateKey.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyBoardPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyBoardPress);
  }
  handleKeyBoardPress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.playNote();
    }
  }

  activateKey() {
    if (this.props.power) {
      this.state.keysAspect.backgroundColor === "cyan" ?
      this.setState({
        keysAspect: inactive }) :

      this.setState({
        keysAspect: active });

    } else {
      this.state.keysAspect.marginTop === 13 ?
      this.setState({
        keysAspect: inactive }) :

      this.setState({
        keysAspect: {
          height: 77,
          marginTop: 13,
          backgroundColor: "rgb(25, 73, 206)",
          boxShadow: "0 3px rgb(25, 73, 206)" } });


    }
  }
  playNote(e) {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    sound.play();
    this.activateKey();
    setTimeout(() => this.activateKey(), 100);
    this.props.updateDisplay(this.props.clipId.replace(/-/g, " "));
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", {
        id: this.props.clipId,
        onClick: this.playNote,
        className: "drum-pad",
        style: this.state.keysAspect }, /*#__PURE__*/

      React.createElement("audio", {
        className: "clip",
        id: this.props.keyTrigger,
        src: this.props.clip }),

      this.props.keyTrigger));


  }}


class PadBank extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let padBank;
    this.props.power ?
    padBank = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
      return /*#__PURE__*/(
        React.createElement(DrumKeys, {
          clipId: padBankArr[i].id,
          clip: padBankArr[i].url,
          keyTrigger: padBankArr[i].keyTrigger,
          keyCode: padBankArr[i].keyCode,
          updateDisplay: this.props.updateDisplay,
          power: this.props.power }));


    }) :
    padBank = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
      return /*#__PURE__*/(
        React.createElement(DrumKeys, {
          clipId: padBankArr[i].id,
          clip: "#",
          keyTrigger: padBankArr[i].keyTrigger,
          keyCode: padBankArr[i].keyCode,
          updateDisplay: this.props.updateDisplay,
          power: this.props.power }));


    });
    return /*#__PURE__*/React.createElement("div", { className: "pad-bank" }, padBank);
  }}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      display: String.fromCharCode(160),
      currentPadBank: storeOne,
      currentPadBankId: "Voices",
      sliderVal: 0.3 };

    this.displayClipName = this.displayClipName.bind(this);
    this.selectBank = this.selectBank.bind(this);
    this.adjustVolume = this.adjustVolume.bind(this);
    this.powerControl = this.powerControl.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
  }
  powerControl() {
    this.setState({
      power: !this.state.power,
      display: String.fromCharCode(160) });

  }
  selectBank() {
    if (this.state.power) {
      this.state.currentPadBankId === "Voices" ?
      this.setState({
        currentPadBank: storeTwo,
        display: "Latino-Mood",
        currentPadBankId: "Latino-Mood" }) :

      this.setState({
        currentPadBank: storeOne,
        display: "Voices",
        currentPadBankId: "Voices" });

    }
  }
  displayClipName(name) {
    if (this.state.power) {
      this.setState({
        display: name });

    }
  }
  adjustVolume(e) {
    if (this.state.power) {
      this.setState({
        sliderVal: e.target.value,
        display: "Volume: " + Math.round(e.target.value * 100) });

      setTimeout(() => this.clearDisplay(), 1000);
    }
  }
  clearDisplay() {
    this.setState({
      display: String.fromCharCode(160) });

  }
  render() {
    const powerSlider = this.state.power ?
    {
      float: "left" } :

    {
      float: "right" };

    const bankSlider =
    this.state.currentPadBank === storeOne ?
    {
      float: "left" } :

    {
      float: "right" };

    {
      const clips = [].slice.call(document.getElementsByClassName("clip"));
      clips.forEach(sound => {
        sound.volume = this.state.sliderVal;
      });
    }
    return /*#__PURE__*/(
      React.createElement("div", { id: "drum-machine", className: "inner-container" }, /*#__PURE__*/
      React.createElement(PadBank, {
        power: this.state.power,
        updateDisplay: this.displayClipName,
        clipVolume: this.state.sliderVal,
        currentPadBank: this.state.currentPadBank }), /*#__PURE__*/


      React.createElement("div", { className: "controls-container" }, /*#__PURE__*/
      React.createElement("div", { className: "control" }, /*#__PURE__*/
      React.createElement("p", null, "On/Off"), /*#__PURE__*/
      React.createElement("div", { onClick: this.powerControl, className: "select" }, /*#__PURE__*/
      React.createElement("div", { style: powerSlider, className: "inner" }))), /*#__PURE__*/


      React.createElement("div", { className: "control" }, /*#__PURE__*/
      React.createElement("p", null, "Store"), /*#__PURE__*/
      React.createElement("div", { onClick: this.selectBank, className: "select" }, /*#__PURE__*/
      React.createElement("div", { style: bankSlider, className: "inner" }))), /*#__PURE__*/



      React.createElement("p", { id: "display" }, this.state.display), /*#__PURE__*/
      React.createElement("div", { className: "volume-slider" }, /*#__PURE__*/
      React.createElement("input", {
        type: "range",
        min: "0",
        max: "1",
        step: "0.01",
        value: this.state.sliderVal,
        onChange: this.adjustVolume })))));





  }}


const storeOne = [
{
  keyCode: 81,
  keyTrigger: "Q",
  id: "bass",
  url:
  "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Voice/23[kb]bass.aif.mp3" },

{
  keyCode: 87,
  keyTrigger: "W",
  id: "blash-chea-vox",
  url:
  "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Voice/158[kb]blash-chea-vox.wav.mp3" },

{
  keyCode: 69,
  keyTrigger: "E",
  id: "cmon-1",
  url:
  "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Voice/186[kb]cmon-(compressed).aif.mp3" },

{
  keyCode: 65,
  keyTrigger: "A",
  id: "cmon-2",
  url:
  "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Voice/214[kb]cmon-(delayverb).aif.mp3" },

{
  keyCode: 83,
  keyTrigger: "S",
  id: "cmon-3",
  url:
  "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Voice/154[kb]cmon-(thick_n_throaty).aif.mp3" },

{
  keyCode: 68,
  keyTrigger: "D",
  id: "compressed",
  url:
  "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Voice/113[kb]compressed_ow.aif.mp3" },

{
  keyCode: 90,
  keyTrigger: "Z",
  id: "dwee",
  url:
  "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Voice/36[kb]dwee.aif.mp3" },

{
  keyCode: 88,
  keyTrigger: "X",
  id: "eh",
  url:
  "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Voice/38[kb]eh.wav.mp3" },

{
  keyCode: 67,
  keyTrigger: "C",
  id: "how",
  url:
  "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Voice/39[kb]how.wav.mp3" }];



const storeTwo = [
{
  keyCode: 81,
  keyTrigger: "Q",
  id: "tree-tinkles",
  url:
  "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Western%20and%20Latin%20Percussion/905[kb]bell-tree-tinkles-1.wav.mp3" },

{
  keyCode: 87,
  keyTrigger: "W",
  id: "bell",
  url:
  "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Western%20and%20Latin%20Percussion/13[kb]bell1.aif.mp3" },

{
  keyCode: 69,
  keyTrigger: "E",
  id: "bigmaraca",
  url:
  "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Western%20and%20Latin%20Percussion/15[kb]bigmaraca.aif.mp3" },

{
  keyCode: 65,
  keyTrigger: "A",
  id: "cabasa",
  url:
  "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Western%20and%20Latin%20Percussion/15[kb]cabasa.aif.mp3" },

{
  keyCode: 83,
  keyTrigger: "S",
  id: "clangy-bell",
  url:
  "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Western%20and%20Latin%20Percussion/27[kb]clangy-bell.wav.mp3" },

{
  keyCode: 68,
  keyTrigger: "D",
  id: "clave",
  url:
  "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Western%20and%20Latin%20Percussion/4[kb]clave.aif.mp3" },

{
  keyCode: 90,
  keyTrigger: "Z",
  id: "conga",
  url:
  "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Western%20and%20Latin%20Percussion/10[kb]conga.aif.mp3" },

{
  keyCode: 88,
  keyTrigger: "X",
  id: "conga2",
  url:
  "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Western%20and%20Latin%20Percussion/24[kb]conga2.aif.mp3" },

{
  keyCode: 67,
  keyTrigger: "C",
  id: "cowbell",
  url:
  "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Western%20and%20Latin%20Percussion/16[kb]cowbell808.aif.mp3" }];



const active = {
  backgroundColor: "cyan",
  boxShadow: "0 3px cyan",
  height: 77,
  marginTop: 13 };


const inactive = {
  backgroundColor: "rgb(25, 73, 206)",
  marginTop: 10,
  boxShadow: "3px 3px 5px black" };


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));