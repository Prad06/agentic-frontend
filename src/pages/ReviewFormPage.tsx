
import { useEffect, useState } from 'react';
import AssetReviewForm from '../components/forms/AssetReviewForm';
import IndicationReviewForm from '../components/forms/IndicationReviewForm';
import CatalystReviewForm from '../components/forms/CatalystReviewForm';
import { useParams } from 'react-router-dom';
import type { ReviewJob } from '../types/review';

const API_URL = "http://localhost:4200";
export default function ReviewFormPage() {
  const { reviewId } = useParams();
  const [reviewData, setReviewData] = useState<ReviewJob | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/reviews/${reviewId}`)
      .then(res => res.json())
      .then(data => {
        setReviewData(data);
        setLoading(false);
      });
  }, [reviewId]);

  if (loading) return <div>Loading...</div>;
  if (!reviewData) return <div>Review not found</div>;

    const onSubmit = async (data: any) => {
        try {
            // Make API call to submit the review
            const response = await fetch('/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...data,
                category: reviewData.category,
            }),
            });

            if (!response.ok) {
            throw new Error('Failed to submit review');
            }

            const result = await response.json();
            
            alert(`${reviewData.category} review submitted successfully!`);
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to submit review. Please try again.');
        } finally {
            return;
        }
    };

  switch (reviewData.category) {
    case 'asset':
      return <AssetReviewForm reviewData={reviewData} onSubmit={onSubmit} />;
    case 'indication':
      return <IndicationReviewForm reviewData={reviewData} onSubmit={onSubmit} />;
    case 'catalyst':
      return <CatalystReviewForm reviewData={reviewData} onSubmit={onSubmit} />;
    default:
      return <div>Unknown review type</div>;
  }
}