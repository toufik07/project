import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import pickle

# Load the dataset
data = pd.read_csv('wool_quality_dataset.csv')

# Split the dataset into features (X) and target variable (y)
X = data[['Fiber_Diameter', 'Length', 'Color', 'Crimp', 'Cleanliness']]
y = data['Quality']

# Encode categorical variables
X = pd.get_dummies(X)

# Split the dataset into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize the Random Forest classifier
rf_classifier = RandomForestClassifier(n_estimators=100, random_state=42)

# Train the classifier
rf_classifier.fit(X_train, y_train)

# Make predictions
y_pred = rf_classifier.predict(X_test)

with open('rf_model.pkl', 'wb') as model_file:
    pickle.dump(rf_classifier, model_file)
