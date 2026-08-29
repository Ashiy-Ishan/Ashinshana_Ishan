import { uploadImageToImageKit, imagekitService } from './imagekitService';

describe('imagekitService Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('validates and rejects null or empty file', async () => {
    await expect(uploadImageToImageKit(null)).rejects.toThrow('No file selected.');
  });

  test('validates and rejects non-image files', async () => {
    const fakePdfFile = new File(['dummy content'], 'document.pdf', { type: 'application/pdf' });
    await expect(uploadImageToImageKit(fakePdfFile)).rejects.toThrow(/Invalid file type/);
  });

  test('validates and rejects files exceeding size limit', async () => {
    // 11MB dummy blob
    const largeFile = new File([new ArrayBuffer(11 * 1024 * 1024)], 'large-image.jpg', { type: 'image/jpeg' });
    await expect(uploadImageToImageKit(largeFile)).rejects.toThrow(/exceeds maximum limit/);
  });

  test('formats relative filenames into full ImageKit CDN URLs', () => {
    const url = imagekitService.formatImageKitUrl('profile/person.png');
    expect(url).toContain('https://ik.imagekit.io/');
    expect(url).toContain('profile/person.png');
  });

  test('preserves already full HTTP URLs in formatImageKitUrl', () => {
    const fullUrl = 'https://images.unsplash.com/photo-123456';
    expect(imagekitService.formatImageKitUrl(fullUrl)).toBe(fullUrl);
  });

  test('successfully executes direct upload when auth params endpoint is available', async () => {
    const mockAuthParams = {
      signature: 'test_sig',
      token: 'test_token',
      expire: 1787999999,
      publicKey: 'public_test_key'
    };

    const mockUploadResponse = {
      fileId: 'ik_file_123',
      url: 'https://ik.imagekit.io/x2eerczu0/uploads/test.png'
    };

    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockAuthParams
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUploadResponse
      });

    const testFile = new File(['fake-image-data'], 'test.png', { type: 'image/png' });
    const uploadedUrl = await uploadImageToImageKit(testFile, 'portfolio-uploads');

    expect(uploadedUrl).toBe('https://ik.imagekit.io/x2eerczu0/uploads/test.png');
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});

