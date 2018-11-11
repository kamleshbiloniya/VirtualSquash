	
// package com.javaournaldev.socket;

import java.io.*;
import java.nio.*;
// import java.io.ObjectOutputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.lang.ClassNotFoundException;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * This class implements java Socket server
 <!-- * @author pankaj -->
 *
 */
public class SocketServerExample {
    
    //static ServerSocket variable
    private static ServerSocket server;
    //socket server port on which it will listen
    private static int port = 9876;
    final static Path dst = Paths.get("/home/kamlesh/Downloads/squash2/data.xml");
    // final BufferedWriter writer;
    public static void main(String args[]) throws IOException, ClassNotFoundException{
        //create the socket server object
        server = new ServerSocket(port);
        //keep listens indefinitely until receives 'exit' call or program terminates
        int i=0;
        while(true){
            System.out.println("Waiting for new client message");
            //creating socket and waiting for client connection
            Socket socket = server.accept();
            // System.out.println("accepted");
            //read from socket to ObjectInputStream object
           	InputStreamReader isr = new InputStreamReader(socket.getInputStream());
           	BufferedReader br = new BufferedReader(isr);
           	// String message = br.readLine();
           	String message ="ok";
           	try (BufferedWriter writer = Files.newBufferedWriter(dst, StandardCharsets.UTF_8,StandardOpenOption.WRITE)) {

			while ((message = br.readLine())!=null) {
				writer.write(message);
				writer.newLine();
			}
			System.out.println(i++);

			} catch (IOException e) {

				e.printStackTrace();

			}
           // 	  int i;    
	          // while((i=br.read())!=-1){  
	          // System.out.print((char)i);  
	          // } 
			message = "ok";
           	// System.out.printl	n(message);
            // System.out.println("okay!!");
            // ObjectInputStream ois = new ObjectInputStream(socket.getInputStream());
            //convert ObjectInputStream object to String
            // String message = (String) ois.readObject();
            // System.out.println("Message Received: " + message);
            //create ObjectOutputStream object
            // ObjectOutputStream oos = new ObjectOutputStream(socket.getOutputStream());
            //write object to Socket
            // oos.writeObject("Hi Client "+message);
            //close resources
            // ois.close();
            // oos.close();
            // socket.close();
            //terminate the server if client sends exit request
            if(message.equalsIgnoreCase("exit")) break;
        }
        System.out.println("Shutting down Socket server!!");
        //close the ServerSocket object
        server.close();
    }
    
}
