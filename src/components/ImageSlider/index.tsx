import React, { useEffect, useState } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import Image from '../../models/image';
import './styles.scss';

interface ImageSliderProps {
    url: string;
    page: number;
    limit: number;
}

const ImageSlider = (props: ImageSliderProps) => {
    const { url, page, limit } = props;
    const [images, setImages] = useState<Image[]>([]);
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                if (url) {
                    setIsLoading(true);
                    const response = await fetch(`${url}?page=${page}&limit=${limit}`);
                    const data = await response.json();

                    if (data) {
                        setImages(data);
                        setIsLoading(false);
                    }
                }
            } catch (e: any) {
                setErrorMessage(e.message);
                setIsLoading(false);
            }
        };
        fetchImages();
    }, [url]);

    if (isLoading) {
        return <div> Loading images. Please wait... </div>;
    }

    if (errorMessage) {
        return <div> Error has occurred: {errorMessage} </div>
    }

    const onLeftArrowClick = () => {
        const previousSlide = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
        setCurrentSlide(previousSlide);
    };

    const onRightArrowClick = () => {
        const nextSlide = currentSlide === images.length - 1 ? 0 : currentSlide + 1;
        setCurrentSlide(nextSlide);
    };

    const onIndicatorClick = (slideIndex: number) => setCurrentSlide(slideIndex);

    return (
        <div className='container'>
            <BsArrowLeftCircleFill onClick={onLeftArrowClick} />
            {
                images && images.length ? (
                    images.map((image, index) => <img 
                        key={image.id} 
                        className={index === currentSlide? "current-slide" : "slide"} 
                        alt={image.download_url} 
                        src={image.download_url} />)
                ) : null
            }
            <BsArrowRightCircleFill onClick={onRightArrowClick} />
            <span className='carousel-indicators'>
                {
                    images && images.length ? (
                        images.map((image, index) => <button key={image.id} className='indicator' onClick={() => onIndicatorClick(index)} />)
                    ) : null
                }
            </span>
        </div>
    );
};

export default ImageSlider;