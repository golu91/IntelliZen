#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import numpy as np
from sklearn.linear_model import LinearRegression

# X: (num_samples, 2) [student_density, ambient_temperature]
# y: (num_samples,) [fan_speed or brightness]

X = np.array(...)
y = np.array(...)

model = LinearRegression()
model.fit(X,y)

# New student density and temperature data points
new_data = [[density, temperature], ...]

# Adjust the fan_speed or brightness
predicted_values = model.predict(new_data)

# To print the regression coefficients:
print(model.coef_)
print(model.intercept_)

