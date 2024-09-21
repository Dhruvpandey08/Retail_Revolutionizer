import warnings
warnings.filterwarnings("ignore")	
import numpy as np
import json
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
import tensorflow as tf
from tensorflow.keras.models import load_model
from flask import Flask
from datetime import datetime
import csv

app = Flask(__name__)

@app.route('/')
def hello_world():
	return 'Hello World'

@app.route('/models',methods=['POST'])
def get_model():
		print("Mai Chala")
		look_back = 20
		sales = {}
		with open('D:/Projects/PJT/dataset.csv', mode ='r') as file:
			csvFile = csv.reader(file)
			for lines in csvFile:
				sales[lines[0]] = [i for i in lines[1:53]]
			del(sales['Product_Code'])		
		dataset = {'dataset': [float(i) for i in sales['Garlic Oil - Vegetarian Capsule 500 mg']]+[float(i) for i in sales['Garlic Oil - Vegetarian Capsule 500 mg']]}
		kj = pd.date_range(end=datetime.today(), periods=len(dataset['dataset']), freq='W').tolist()
		dataset['kj'] = kj	
		df = pd.DataFrame(dataset['dataset'],index=dataset['kj'],columns =['Open'])

		model=load_model("D:/Projects/PJT/Models/lstm_model.keras")
		data = df.values
		data = data.astype('float32')
		scaler = MinMaxScaler(feature_range=(0, 1))
		data = scaler.fit_transform(data)
		data_value = data.copy()

		for i in range(5):
			X_new = data_value[-look_back:]
			X_new = np.reshape(X_new, (1, 1, look_back))
			Y_new = model.predict(X_new,verbose=0)
			Y_new = scaler.inverse_transform(Y_new)
			np.append(data_value,float(Y_new))

		print(data_value)
		return "data"

if __name__ == '__main__':
	app.run()
