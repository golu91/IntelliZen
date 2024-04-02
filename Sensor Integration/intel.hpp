#include <CL/sycl.hpp>
#include <iostream>
#include <vector>
#include <cmath>
#include <random>

using namespace std;
using namespace sycl;

constexpr int ARRAY_SIZE = 1000;

class SensorTask;

int main() {
    // Vector to store simulated sensor data
    vector<float> distances(ARRAY_SIZE);
    vector<float> temperatures(ARRAY_SIZE);

    try {
        // Create a device selector for Intel DevCloud
        auto dev_selector = [](const device& dev) {
            return dev.get_info<info::device::name>().find("Intel(R) Gen") != string::npos;
        };

        // Create a queue for Intel DevCloud
        queue q(dev_selector);

        // Define function to simulate sensor readings
        auto simulate_sensor_readings = [](float& dist, float& temp) {
            // Simulate distance (in cm) within the range of 0 to 200
            dist = static_cast<float>(rand() % 201);

            // Simulate temperature (in Celsius) within the range of 0 to 40
            temp = static_cast<float>(rand() % 41);
        };

        // Allocate buffers to store sensor data
        buffer<float, 1> distances_buf(distances.data(), range<1>(ARRAY_SIZE));
        buffer<float, 1> temperatures_buf(temperatures.data(), range<1>(ARRAY_SIZE));

        // Submit sensor data processing task to the queue
        q.submit([&](handler& h) {
            // Accessors to write to buffers
            accessor distances_acc(distances_buf, h, write_only);
            accessor temperatures_acc(temperatures_buf, h, write_only);

            // Kernel to simulate sensor readings
            h.parallel_for<class SensorTask>(range<1>(ARRAY_SIZE), [=](id<1> idx) {
                float dist, temp;
                // Simulate sensor readings
                simulate_sensor_readings(dist, temp);

                // Write simulated readings to buffers
                distances_acc[idx] = dist;
                temperatures_acc[idx] = temp;
            });
        });

        // Wait for the kernel to finish execution
        q.wait_and_throw();

        // Print sensor readings for demonstration
        for (int i = 0; i < ARRAY_SIZE; ++i) {
            float dist = distances[i];
            float temp = temperatures[i];
            std::cout << "Distance: " << dist << " cm, Temperature: " << temp << " °C" << std::endl;

            // For example, we can control actuators based on sensor values
            if (dist < 100) {
                int student_density = 100 / dist;
                if (student_density > 10) {
                    // Turn off lights, AC, and fan if student density is high
                    std::cout << "High student density detected." << std::endl;
                    
                } else {
                    // Adjust fan speed based on distance if student density is low
                    std::cout << "Low student density detected." << std::endl;
                    
                }
            } else {
                // Adjust fan speed based on distance if student density is low
                std::cout << "Low student density detected." << std::endl;
                            }

            if (temp > 25) {
                // Turn on AC if temperature is high
                std::cout << "High temperature detected." << std::endl;
               
            }
        }

    } catch (sycl::exception const& e) {
        cerr << "SYCL exception caught: " << e.what() << endl;
        return 1;
    }

    return 0;
}
