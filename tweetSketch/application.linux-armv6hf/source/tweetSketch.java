import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class tweetSketch extends PApplet {


public void setup() {
  
  int aColor = color(random(255),random(255),random(255));
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
  public void settings() {  size(960, 540); }
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "tweetSketch" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
