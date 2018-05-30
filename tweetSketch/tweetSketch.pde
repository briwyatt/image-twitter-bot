
void setup() {
  size(960, 540);
  color aColor = color(random(255),random(255),random(255));
  background(aColor);
  PFont font;
  font = createFont("Georgia", 40);
  String[] lines = loadStrings("datafile.txt");

  String twitterHandle = lines[0];
  textFont(font);
  textAlign(LEFT, LEFT); 
  text(twitterHandle, 625, 500); 
  save("custom-tweet.png");
  exit();
}
