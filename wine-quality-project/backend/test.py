

import requests

BASE_URL = "http://127.0.0.1:8000"

SAMPLE_WINE = {
    "fixed_acidity": 7.4,
    "volatile_acidity": 0.70,
    "citric_acid": 0.00,
    "residual_sugar": 1.9,
    "chlorides": 0.076,
    "free_sulfur_dioxide": 11.0,
    "total_sulfur_dioxide": 34.0,
    "density": 0.9978,
    "pH": 3.51,
    "sulphates": 0.56,
    "alcohol": 9.4,
}


def check(name, method, path, **kwargs):
    url = f"{BASE_URL}{path}"
    try:
        resp = requests.request(method, url, timeout=10, **kwargs)
        ok = resp.status_code == 200
        status = "PASS" if ok else "FAIL"
        print(f"[{status}] {name:<25} status={resp.status_code}")
        if not ok:
            print(f"         -> {resp.text[:200]}")
        return ok, resp
    except requests.exceptions.ConnectionError:
        print(f"[FAIL] {name:<25} could not connect — is the server running?")
        return False, None
    except Exception as e:
        print(f"[FAIL] {name:<25} error: {e}")
        return False, None


def main():
    print(f"Testing API at {BASE_URL}\n")

    check("Health check", "GET", "/")
    check("Summary", "GET", "/summary")
    check("Quality distribution", "GET", "/quality-distribution")
    check("Correlation", "GET", "/correlation")
    check("High quality wines", "GET", "/high-quality", params={"threshold": 7})

    ok, resp = check("Predict", "POST", "/predict", json=SAMPLE_WINE)
    if ok and resp is not None:
        data = resp.json()
        print(f"         -> predicted_quality={data.get('predicted_quality')}, "
              f"label={data.get('quality_label')}")

    print("\nDone.")


if __name__ == "__main__":
    main()