#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import cv2

class YOLOv3:
    def __init__(self, model_path):
        self.net = cv2.dnn.readNetFromDarknet(model_path, "config.cfg")
        self.net.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)

    def detect_objects(self, source, conf_threshold=0.5):
        img = cv2.imread(source)
        height, width, channels = img.shape
        blob = cv2.dnn.blobFromImage(cv2.resize(img, (416, 416)), 0.00392, (416, 416), (0, 0, 0), True, crop=False)
        self.net.setInput(blob)
        outs = self.net.forward(["yolo_82", "yolo_94", "yolo_106"])

        for out in outs:
            for detection in out:
                scale = float(self.net.getUnconnectedOutLayersNames()[0].split(":")[-1][1:])
                for i in range(0, detection.shape[2]):
                    object_id = int(detection[0, 0, i, 1])
                    if object_id == 0:
                        confidence = detection[0, 0, i, 2]
                        if confidence > conf_threshold:
                            print(f"Confidence: {confidence} for Label: {'person'}")

yolo_model = YOLOv3("yolov3.cfg")
yolo_model.detect_objects("students_video.mp4")


