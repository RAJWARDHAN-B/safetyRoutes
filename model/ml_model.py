import joblib
import warnings


version ='__0.1.0__'

knn=joblib.load('safetyRoutes/model/knn_model.pkl')  
scaler=joblib.load('safetyRoutes/model/scaler.pkl')


def predict_score(lat, lon):
    warnings.simplefilter(action='ignore', category=UserWarning)
    loc = scaler.transform([[lat, lon]])
    score=knn.predict(loc)
    return score





