package com.example.kamlesh.afinal;

import android.annotation.SuppressLint;
import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.Socket;
import java.lang.Math;

public class MainActivity extends AppCompatActivity implements SensorEventListener {
    private EditText el;
    private TextView tv;
    private static final String TAG = "MainActivity";
    private SensorManager sensorManager;
    private Sensor accelerometer;
    private Sensor gyroscope;
    private Sensor rotV;
    private Sensor lineracc;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        el = (EditText)findViewById(R.id.editText);
        tv = (TextView)findViewById(R.id.textView);

        sensorManager = (SensorManager)getSystemService(Context.SENSOR_SERVICE);
        accelerometer = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
        gyroscope = sensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE);
        rotV = sensorManager.getDefaultSensor(Sensor.TYPE_ROTATION_VECTOR);
        lineracc = sensorManager.getDefaultSensor(Sensor.TYPE_LINEAR_ACCELERATION);
        sensorManager.registerListener(this,accelerometer,40000);
        sensorManager.registerListener(this,gyroscope,40000);
        sensorManager.registerListener(this,rotV,40000);
        sensorManager.registerListener(this,lineracc,40000);

    }
    public void send_data(View view){
        String message = el.getText().toString();
//        String message = "hello from vivo Y51L";
        tv.setText(message);
        BackRoundTask bl = new BackRoundTask();
        bl.execute(message);
        System.out.print(message);
    }

    @Override
    public void onSensorChanged(SensorEvent sensorEvent) {
        if(sensorEvent.sensor.getType() == Sensor.TYPE_ACCELEROMETER){
            double x =100*sensorEvent.values[0];
            double y =100*sensorEvent.values[1];
            double z =100*sensorEvent.values[2];
            String message = "Acceleration Data from Vivo: X:" + sensorEvent.values[0] +" Y:"+sensorEvent.values[1]+" Z:"+sensorEvent.values[2];
//            tv.setText(message);
            BackRoundTask bl = new BackRoundTask();
//            bl.execute(message);
//            Log.d(TAG, message);
        }
        if(sensorEvent.sensor.getType() == Sensor.TYPE_LINEAR_ACCELERATION){
            double x =800+10*sensorEvent.values[0];
            double y =450+10*sensorEvent.values[1];
            double z =(-200)+10*sensorEvent.values[2];
            String out = "<?xml version=\"1.0\" encoding=\"UTF-8\"?> \n <note> \n <x1>300</x1>\n <y1>450</y1> \n <z1>-200</z1> \n <xr1>6605</xr1> \n <yr1>0</yr1> \n <zr1>0</zr1> \n <x2>"+x+"</x2> \n<y2>"+y+"</y2> \n <z2>"+z+"</z2>\n <xr2>6605</xr2>\n <yr2>0</yr2>\n <zr2>0</zr2> \n </note>\n\n";
            String message = "Linear acc Data from Vivo: Ax:" + sensorEvent.values[0] +" Ay:"+sensorEvent.values[1]+" Az:"+sensorEvent.values[2];
//            tv.setText(message);
            BackRoundTask bl = new BackRoundTask();
//            bl.execute(out);
        }
        if(sensorEvent.sensor.getType() == Sensor.TYPE_ROTATION_VECTOR){
            double pi=3.14159;
            double x =sensorEvent.values[0];
            double y =sensorEvent.values[1];
            double z =sensorEvent.values[2];
            x = 0;
            y = 0;
            z = -z*720/pi;
            String out = "<?xml version=\"1.0\" encoding=\"UTF-8\"?> \n <note> \n <x1>300</x1>\n <y1>450</y1> \n <z1>-200</z1> \n <xr1>6605</xr1> \n <yr1>0</yr1> \n <zr1>0</zr1> \n <x2>800</x2> \n<y2>450</y2> \n <z2>-200</z2>\n <xr2>"+x+"</xr2>\n <yr2>"+y+"</yr2>\n <zr2>"+z+"</zr2>\n </note>\n\n";
            String message = "Rotation Data from Vivo: X:" + x +" Y:"+y+" Z:"+z;
            tv.setText(message);
            BackRoundTask bl = new BackRoundTask();
            bl.execute(out);
        }

    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int i) {
        // do nothing haha
    }

    class BackRoundTask extends AsyncTask<String,Void,Void>
    {
        Socket s;
        PrintWriter writer;


        @Override
        protected Void doInBackground(String... voids) {
            try {
//                tv.setText("hello from background");
                String message = voids[0];
//                s =new Socket("172.27.27.10",8888);
                s =new Socket("172.24.240.41",9876);
                writer = new PrintWriter(s.getOutputStream());
                writer.write(message);
                writer.flush();
                writer.close();

            } catch (IOException e) {
                e.printStackTrace();
            }


            return null;
        }
    }


}
